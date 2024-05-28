import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import {AccountLockoutError, ResetPasswordPasscodeExpired, IncorrectResetPasswordPasscode, AccountAlreadyExists, SqlError, UnexpectedError} from 'expanse-common/server-errors'
import {
  MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION_MINUTES, RESET_PASSWORD_PASSCODE_EXPIRATION_IN_MINUTES
} from '../../config/index.js'

class User {
  constructor(connection) {
    this.connection = connection
    this.id = null
    this.fullName = ""
    this.active = 1
    this.sessions = []
    this.agreements = []
    this.role = null
    this.email = ""
    this.phone = ""
    this.password = ""
    this.salt = ""
    this.resetPasswordPasscode = null
    this.resetPasswordPasscodeExpiration = null
    this.lastLogIn = null
    this.createdAt = null
    this.updatedAt = null

    // Account lockout fields
    this.lockoutExpiry = null
    this.loginAttempts = 0
    this.isLockedOut = false
  }

  // getter function that determines its value based on the fullName field
  get firstName() {
    return this.fullName.split(" ")[0]
  }

  // getter function that determines its value based on the fullName field
  get lastName() {
    return this.fullName.split(" ")[1]
  }

  /*
    Used to take a plaintext password and turn it into a hashed version and a salt
    Use the bcrypt library. 
    Update the models salt and password values with the generated password and salt values.
  */
  setPassword(plainPassword) {
    const saltRounds = 10
    this.salt = bcrypt.genSaltSync(saltRounds)
    this.password = bcrypt.hashSync(plainPassword, this.salt)
  }

  /*
    Handles inserting a new entry.
    The sign up function expects the setPassword function to have been called and for there to be a hashed password value and salt saved to the model.
    The sign up function should expect the fullName, email values to be set on the model.
    The error message should be 'Error inserting user account'
    Return the Inserted user ID
    Access the variable values on the model
    Utilize the mysql2 node library to insert into the database
    Set the lastLogin timestamp as the current time formatted as YYYY-MM-DD HH:mm:ss for a mysql timestamp field. Utilize moment for formatting.
    Update the current models id to be equal to the returned id

  */
  async signUp() {
    const now = moment()
    const sql =
      `INSERT INTO expanse_auth.users 
      (id, fullName, active, email, phone, password, salt, loginAttempts, lockoutExpiry, isLockedOut, resetPasswordPasscode, resetPasswordPasscodeExpiration, lastLogIn, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const id = uuidv4()
    const values = [
      id,
      this.fullName,
      this.active,
      this.email,
      this.phone,
      this.password,
      this.salt,
      // Account lockout fields
      this.loginAttempts,
      this.lockoutExpiry,
      this.isLockedOut,
      // Reset Password fields
      this.resetPasswordPasscode,
      this.resetPasswordPasscodeExpiration,
      // Timestamps
      now.format("YYYY-MM-DD HH:mm:ss.sss"),
      now.format("YYYY-MM-DD HH:mm:ss.sss"),
      now.format("YYYY-MM-DD HH:mm:ss.sss"),
    ]

    const foundUser = await this.findByEmail(this.email)
    if(foundUser && foundUser.id) {
      throw new AccountAlreadyExists()
    }


    try {
      const [result] = await this.connection.execute(sql, values)
      this.id = id
      this.updatedAt = now.toISOString()
      this.createdAt = now.toISOString()
      this.lastLogIn = now.toISOString()
      return this.id
    } catch (error) {
      throw new SqlError(error, {
        note: "Unable to create account.",
        email: this.email,
        fullName: this.fullName,
      })
    }
  }

  /*
    Accept an email and plain text password. 
    It should check the database for a user account with the provided email using the findByEmail function.
    If no user is found for the provided email is found throw an error saying "No user account found for the provided email"
    If a user account is found, compare the hashed password with the provided plaintext password using bcrypt.
    If the password does not match, return false
    If the password does match, update the current user model with the found user's data and return true
    This function should implement account lockouts with a gradual lockout increase, and temporary lockout to prevent brute force login attempts.
    The lockout should be reset on successful login.
    Throw an error with information about the lockout if the user is locked out, include the lockout expiration and amount of time left before the next login is allowed.
    Utilize the loginAttempts, lockoutExpiry, and isLockedOut fields for tracking lockouts. Update these values in the database with each attempt.
    Reference the MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION_MINUTES, and LOCKOUT_DURATION_IN_MILLISECONDS configuration variables for implementation
    
    During the login process
    Check if the user is already locked out.
    If not locked out, attempt to log in with the provided credentials.
    If the login fails, update the login attempts count and lockout status.
    If the login succeeds, reset the login attempts count and lockout status.

    Lockout expiry format expected from db: // Date format: 2023-07-31T19:17:55.183Z YYYY-MM-DDTHH:mm:ss.SSSZ
  */
  async login(email, plainPassword) {
    const foundUser = await this.findByEmail(email)

    if (!foundUser) {
      console.log("No user account found for the provided email")
      return false
    }

    const lockoutExpiry = moment(foundUser.lockoutExpiry)
    const remainingLockoutDurationMilliseconds = lockoutExpiry > moment.now() ? lockoutExpiry.diff(moment(), 'milliseconds') : 0
    const newLockoutExpiry = moment().add(LOCKOUT_DURATION_MINUTES, 'minutes')

    // Check if the user is locked out
    if (foundUser.isLockedOut && foundUser.lockoutExpiry !== null && lockoutExpiry > moment.now()) {
      throw new AccountLockoutError(remainingLockoutDurationMilliseconds)
    }

    const isValidPassword = this.comparePasswords(
      plainPassword,
      foundUser.password
    )

    // If the password does not match, update login attempts and lockout status
    if (!isValidPassword) {
      console.log('---not valid password---')
      console.log('login attempts before', foundUser.loginAttempts)
      foundUser.loginAttempts++
      console.log('login attempts after', foundUser.loginAttempts)

      if (foundUser.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        foundUser.isLockedOut = true
        foundUser.lockoutExpiry = newLockoutExpiry.format('YYYY-MM-DD HH:mm:ss.sss')
      }

      // Update login attempts and lockout status in the database
      await this.updateLoginAttemptsAndLockoutStatus(foundUser)

      return false
    }

    // If the password is valid, reset login attempts and lockout status
    foundUser.loginAttempts = 0
    foundUser.isLockedOut = false
    foundUser.lockoutExpiry = null

    // Update login attempts and lockout status in the database
    await this.updateLoginAttemptsAndLockoutStatus(foundUser)

    // Populate the model fields with the found user data
    this.mapRowToModel(foundUser)

    return true
  }

  /* 
    Function to generate a password reset passcode for a user
    Verify the email is set for the user
    Generate a 7 digit reset passcode
    Generate an expiration date based on config key RESET_PASSWORD_PASSCODE_EXPIRATION_IN_MINUTES
    Update the user in the database with the new values for resetPasswordPasscode and resetPasswordPasscodeExpiration
    If there is an error during the update process rethrow with a generic error
    Update the model with the new values for resetPasswordPasscode and resetPasswordPasscodeExpiration
    Return the generated token
  */
  async generateResetPasswordPasscode() {
    // todo log request w/ ip
    // todo determine best method for obtaining ip etc, middleware auth repo creation? Constructor that accepts context?
    if (!this.email) {
      throw new UnexpectedError(null, {note: 'Email address is not set for the user.'})
    }

    const resetPasswordPasscode = Math.floor(1000000 + Math.random() * 9000000).toString()
    const resetPasswordPasscodeExpiration = moment().add(RESET_PASSWORD_PASSCODE_EXPIRATION_IN_MINUTES, 'minutes')

    const sql = "UPDATE users SET resetPasswordPasscode = ?, resetPasswordPasscodeExpiration = ? WHERE id = ?"
    const values = [resetPasswordPasscode, resetPasswordPasscodeExpiration.format('YYYY-MM-DD HH:mm:ss.sss'), this.id]

    try {
      await this.connection.execute(sql, values)
      this.resetPasswordPasscode = resetPasswordPasscode
      this.resetPasswordPasscodeExpiration = resetPasswordPasscodeExpiration.toISOString()
    } catch (error) {
      throw new SqlError(error, {
        note: "Error updating reset password passcode.",
      })
    }
    return resetPasswordPasscode
  }

  /*
    Check passcode expiration
    Verify passcode matches current set passcode for provided email
    Refresh passcode valid timeframe to extend for password reset entry
    If passcode is expired throw ResetPasswordPasscodeExpired error
    If passcode is incorrect throw IncorrectResetPasswordPasscode error
    Check for expiration before checking validity
  */
  async verifyResetPasswordPasscode(resetPasscode) {
    if (!this.email) {
      throw new UnexpectedError(null, 'Email address is not set for the user.')
    }

    if (this.resetPasswordPasscodeExpiration === null || this.resetPasswordPasscode === null) {
      throw new UnexpectedError(null, 'No password reset passcode found for the user.')
    }

    const now = moment()
    const passcodeExpirationTimestamp = moment(this.resetPasswordPasscodeExpiration)

    if (now.isAfter(passcodeExpirationTimestamp)) {
      throw new ResetPasswordPasscodeExpired()
    }

    if (this.resetPasswordPasscode !== parseInt(resetPasscode)) {
      throw new IncorrectResetPasswordPasscode()
    }

    // Update the resetPasswordPasscodeExpiration with the new expiration time
    const newResetPasswordPasscodeExpiration = moment().add(RESET_PASSWORD_PASSCODE_EXPIRATION_IN_MINUTES, 'minutes')
    const sql = "UPDATE users SET resetPasswordPasscodeExpiration = ? WHERE id = ?"
    const values = [newResetPasswordPasscodeExpiration.format('YYYY-MM-DD HH:mm:ss.sss'), this.id]

    try {
      await this.connection.execute(sql, values)
      this.resetPasswordPasscodeExpiration = newResetPasswordPasscodeExpiration.toISOString()
      this.updatedAt = newResetPasswordPasscodeExpiration.toISOString()
    } catch (error) {
      throw new SqlError(error, {
        note: "Error updating reset password passcode expiration.",
      })
    }
  }

  /*
  Update the users password utilizing the set password method
  */
  async updatePassword(newPassword) {
    this.setPassword(newPassword)
    const sql = "UPDATE users SET password = ?, salt = ? WHERE id = ?"
    const values = [
      this.password,
      this.salt,
      this.id
    ]

    try {
      await this.connection.execute(sql, values)
    } catch (error) {
      throw new SqlError(error, {note: "Error updating password."})
    }

    return true
  }

  /*
    Updates the password reset passcode to be expired.
  */
  async forceExpireResetPasswordPasscode() {
    const resetPasswordPasscodeExpiration = moment()

    const sql = "UPDATE users SET resetPasswordPasscodeExpiration = ? WHERE id = ?"
    const values = [resetPasswordPasscodeExpiration.format('YYYY-MM-DD HH:mm:ss.sss'), this.id]
    
    try {
      await this.connection.execute(sql, values)
      this.resetPasswordPasscodeExpiration = resetPasswordPasscodeExpiration.toISOString()
    } catch (error) {
      throw new SqlError(error, {
        note: "Error updating reset password passcode expiration.",
      })
    }
  }

  // Helper function to update login attempts and lockout status in the database. Also updates last login timestamp
  async updateLoginAttemptsAndLockoutStatus(foundUser) {
    const now = moment()
    const sql =
      "UPDATE users SET loginAttempts = ?, isLockedOut = ?, lockoutExpiry = ?, lastLogIn = ? WHERE id = ?"
    const values = [
      foundUser.loginAttempts,
      foundUser.isLockedOut,
      foundUser.lockoutExpiry,
      now.format("YYYY-MM-DD HH:mm:ss.sss"),
      foundUser.id,
    ]

    console.log("Updating lockout status for user", {
      loginAttempts: foundUser.loginAttempts,
      isLockedOut: foundUser.isLockedOut,
      lockoutExpiry: foundUser.lockoutExpiry,
      lastLogIn: now.toISOString(),
    })
    try {
      await this.connection.execute(sql, values)
      this.lastLogIn = now.toISOString()
      this.updatedAt = now.toISOString()
    } catch (error) {
      throw new SqlError(error, {
        note: "Error updating login attempts and lockout status.",
        email: foundUser.email,
        fullName: foundUser.fullName
      })
    }
  }

  /*
    This function should accept an email parameter and query the database for a user matching the provided email address.
    Return the found user if one was found, otherwise return null
  */
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?"
    const [rows] = await this.connection.execute(query, [email])
    console.log('Finding user by email', {email})
    if(rows.length) {
      this.mapRowToModel(rows[0])
      console.log('User found for email', {userId: rows[0].id})
    } else {
      console.log('No user found for email')
    }
    return this
  }

  /*
    There should be a comparePasswords function on the model which accepts an inputPassword in plaintext and compares it to a provided hashedPassword value. 
    The function should utilize the bcrypt library to do this comparison. 
  */
  comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword)
  }

  /*
   This function should accept a parameter that is a mysql2 table row response of a found user and populate the 
   current model from this rows data
   */
  mapRowToModel(row) {
    this.id = row.id
    this.fullName = row.fullName
    this.active = row.active
    this.sessions = row.sessions
    this.agreements = row.agreements
    this.role = row.role
    this.email = row.email
    this.phone = row.phone
    this.password = row.password
    this.salt = row.salt
    this.resetPasswordPasscode = row.resetPasswordPasscode
    this.resetPasswordPasscodeExpiration = row.resetPasswordPasscodeExpiration
    this.lastLogIn = row.lastLogIn
    this.createdAt = row.createdAt
    this.updatedAt = row.updatedAt

    // Account lockout fields
    this.lockoutExpiry = row.lockoutExpiry
    this.loginAttempts = row.loginAttempts
    this.isLockedOut = row.isLockedOut
  }

  /* 
    This function should return fields of the model in a simple json object.
    Do not include the connection field or sensitive information fields such as password, salt, or password reset token
  */
  toJson() {
    const { 
      connection, password, salt, resetPasswordPasscode, resetPasswordPasscodeExpiration, 
      lockoutExpiry, isLockedOut, loginAttempts,
      ...jsonObject
    } =
      this

    return jsonObject
  }
}

export default User
export { User }
