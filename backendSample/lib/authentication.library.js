import { ResetPasswordPasscodeExpired, ExpanseError, UnknownError } from 'expanse-common/server-errors'
import { getAuthMailer } from '../config/mail.config.js'
import {getSignUpSuccessEmail} from '../../email/templates/sign-up-success.js'
import {getPasswordResetEmail} from '../../email/templates/password-reset.js'
import {getPasswordUpdateSuccessEmail} from '../../email/templates/password-update-success.js'

export class AuthLibrary {

  static async sendPasswordUpdatedEmail(_User) {
    const mailer = getAuthMailer()
    const email = getPasswordUpdateSuccessEmail({
      fullName: _User.fullName,
      userEmailAddress: _User.email,
      resetPasscode: _User.resetPasswordPasscode, 
      browserTabTitle: 'Expanse Password Updated',
    })

    if(process.env.SEND_MAIL === "true" ) {
      await mailer.sendMail({
        from: process.env.AUTH_EMAIL_FROM,
        bcc: process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        to: process.env.SEND_MAIL_TO_USERS === "true" ? _User.email : process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        subject: 'Password update successful',
        html: email
      })
      console.log("Reset passcode sent")
      return true
    }

    console.log("Reset passcode not sent - SENDMAIL Disabled via env config")
    return true 
    
  }

  static async sendResetPasscodeEmail(_User) {
    const mailer = getAuthMailer()
    const email = getPasswordResetEmail({
      fullName: _User.fullName,
      userEmailAddress: _User.email,
      resetPasscode: _User.resetPasswordPasscode, 
      browserTabTitle: 'Expanse Reset Email',
    })

    if(process.env.SEND_MAIL === "true" ) {
      await mailer.sendMail({
        from: process.env.AUTH_EMAIL_FROM,
        bcc: process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        to: process.env.SEND_MAIL_TO_USERS === "true" ? _User.email : process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        subject: 'Your password reset code',
        html: email
      })
      console.log("Password updated email sent successfully")
      return true
    }

    console.log("Password update email not sent - SENDMAIL Disabled via env config")
    
    return true 
  }

  static async sendSignUpSuccessEmail(_User) {
    console.log("Should send sign up success email.")
    const mailer = getAuthMailer()
    const email = getSignUpSuccessEmail({
      browserTabTitle: 'Sign Up Successful!',
    })

    if(process.env.SEND_MAIL === "true" ) {
      await mailer.sendMail({
        from: process.env.AUTH_EMAIL_FROM,
        bcc: process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        to: process.env.SEND_MAIL_TO_USERS === "true" ? _User.email : process.env.AUTH_TEST_SENDING_EMAIL_ADDRESS,
        subject: _User.fullName + ', your sign up was successful!',
        html: email
      })
      console.log('Sign up success email sent successfully.')
      return true
    } 
    return true
    
  }

  static async sendVerificationCode(_User) {
    await _User.generateResetPasswordPasscode()
    await AuthLibrary.sendResetPasscodeEmail(_User)
  }

  static async updatePassword(_User, password) {
    await _User.updatePassword(password)
    _User.loginAttempts = 0
    _User.isLockedOut = false
    _User.lockoutExpiry = null
    await _User.updateLoginAttemptsAndLockoutStatus(_User)
    await _User.forceExpireResetPasswordPasscode()
    return true
    // todo: save events / log
  }

  /* 
    Verify passcode, if expired passcode, generate a new code and resend
  */
  static async verifyPasscode(_User, resetPasscode) {
    try {
      await _User.verifyResetPasswordPasscode(resetPasscode)
    } catch (e) {
      if(e instanceof ExpanseError) {
        if (e instanceof ResetPasswordPasscodeExpired) {
          await AuthLibrary.sendVerificationCode(_User)
        } 
        throw e
      }
      else {
        throw new UnknownError()
      }
    }
  }
}