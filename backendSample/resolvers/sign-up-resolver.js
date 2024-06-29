import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import {ExpanseValidator, SIGN_UP_VALIDATION_CONSTRAINTS} from 'expanse-common/validations'
import {AccountAlreadyExists, ValidationError, EmailSendingError, UnexpectedError} from 'expanse-common/server-errors'
import User from '../../models/user/user.js'
import { Agreement } from '../../models/agreement/agreement.js'
import { Session } from '../../models/session/session.js'
import {AuthLibrary} from '../../libraries/authentication.library.js'

export const signUpResolver = async (parent, args, context, info) => {
  const {
    fullName,
    email,
    password,
    agreeToPrivacyPolicy,
    agreeToTermsOfService
  } = args.input
  const {authDbConnection} = context
  const clientIp = context?.req?.ip
  const clientUserAgent = context?.req?.get('User-Agent')
  const validationResults = await ExpanseValidator({
    fullName,
    email,
    password,
    agreeToPrivacyPolicyAndTerms: agreeToPrivacyPolicy && agreeToTermsOfService
  }, SIGN_UP_VALIDATION_CONSTRAINTS)

  if (validationResults && Object.keys(validationResults).length > 0) {
    throw new ValidationError(null, validationResults)
  }

  let _User = new User(authDbConnection)
  let _Session = new Session(authDbConnection)
  let _PrivacyPolicyAgreement = new Agreement(authDbConnection)
  let _TermsOfServiceAgreement = new Agreement(authDbConnection)
  try {
      
    _User.fullName = fullName
    _User.email = email
    _User.setPassword(password)
    await _User.signUp()

    await _Session.createSession({clientIp, clientUserAgent, User: _User})
    _User.sessions.push(_Session)

    _PrivacyPolicyAgreement.ipAddress = clientIp
    _PrivacyPolicyAgreement.userAgent = clientUserAgent
    _PrivacyPolicyAgreement.agreementType = 'PrivacyPolicy'
    _PrivacyPolicyAgreement.userId = _User.id
    await _PrivacyPolicyAgreement.save()

    _TermsOfServiceAgreement.ipAddress = clientIp
    _TermsOfServiceAgreement.userAgent = clientUserAgent
    _TermsOfServiceAgreement.agreementType = 'TermsOfService'
    _TermsOfServiceAgreement.userId = _User.id
    await _TermsOfServiceAgreement.save()

  } catch (e) {
    if(e instanceof AccountAlreadyExists) {
      throw e
    } else {
      throw new UnexpectedError(null, e)
    }
  }
  try {
    // todo remove need to await send, server crashes if a failure occurs
    await AuthLibrary.sendSignUpSuccessEmail(_User)
  } catch (e) {
    throw new EmailSendingError('An error has occurred sending the sign up success email.')
  }


  return {
    success: true,
    jwt: _Session.jwt
  }

}
