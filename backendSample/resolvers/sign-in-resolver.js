import { GraphQLError } from "graphql"
import { ApolloServerErrorCode } from "@apollo/server/errors"
import { ExpanseValidator, SIGN_IN_VALIDATION_CONSTRAINTS } from "expanse-common/validations"
import User from "../../models/user/user.js"
import Session from "../../models/session/session.js"
import {AccountLockoutError,ValidationError, IncorrectLoginCredentials, UnexpectedError} from 'expanse-common/server-errors'

export const signInResolver = async (parent, args, context, info) => {
  const { email, password } = args.input
  const { authDbConnection } = context
  const clientIp = context?.req?.ip
  const clientUserAgent = context?.req?.get("User-Agent")

  const validationResults = await ExpanseValidator(
    {
      email,
      password,
    },
    SIGN_IN_VALIDATION_CONSTRAINTS
  )

  if (validationResults && Object.keys(validationResults).length > 0) {
    throw new ValidationError(null, validationResults)
  }

  let _User = new User(authDbConnection)
  let _Session = new Session(authDbConnection)

  // Attempt to log in
  try {
    const successfulLogin = await _User.login(email, password)
    if(!successfulLogin) {
      throw new IncorrectLoginCredentials()
    }
  } catch (e) {
    if(e instanceof IncorrectLoginCredentials || e instanceof AccountLockoutError) {
      throw e
    } else {
      throw new UnexpectedError()
    }
  }

  // Attempt to create the session
  try {
    await _Session.createSession({ clientIp, clientUserAgent, User: _User })
    console.log(" Session successfully created ", {
      session: _Session.toJson(),
    })
  } catch (e) {
    throw new GraphQLError("There was an error creating the session.", {
      extensions: {
        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      },
    })
  }

  return {
    success: true,
    jwt: _Session.jwt,
  }
}
