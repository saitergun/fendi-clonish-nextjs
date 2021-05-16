import { useState } from 'react'

import {
  RiHeart3Line,
  RiHandbagLine,
  RiMailLine,
  RiArrowGoBackLine,
} from 'react-icons/ri'

import API from '../utils/api'

const SignInForm = ({ onClickForgotPassword }) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [submittingErrorMessage, setSubmittingErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    setSubmitting(true)
    setSubmittingErrorMessage(null)

    const data = { identifier, password }

    API.post('auth/local', data).then((response) => {
      alert(`Congratulations! You are signed now ${response.data.user.username}!`)
    }).catch((error) => {
      if (error.response) {
        setSubmittingErrorMessage(error.response.data.data[0].messages[0].message)
      } else {
        setSubmittingErrorMessage('Unexpected error occured')
      }
    }).finally(() => {
      setSubmitting(false)
    })
  }

  return (
    <div>
      <h3 className="text-20/16 font-medium leadidng-none">SIGN IN TO YOUR ACCOUNT</h3>

      <p className="mt-3">Please enter your email and password to access your account and shopping preferences.</p>

      {submittingErrorMessage && (
        <p className="mt-3 text-red-500">{submittingErrorMessage}</p>
      )}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label
            htmlFor="sign-in-popover-email"
            className="font-semibold "
          >EMAIL*</label>

          <input
            type="email"
            id="sign-in-popover-email"
            className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start mt-4">
          <label
            htmlFor="sign-in-popover-password"
            className="font-semibold"
          >PASSWORD*</label>

          <input
            type="password"
            id="sign-in-popover-password"
            className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sign-in-popover-remember"
              defaultChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <label
              htmlFor="sign-in-popover-remember"
              className="cursor-pointer text-semibold m-0"
            >Keep me signed in</label>
          </div>

          <button
            type="button"
            className="italic underline p-1"
            onClick={onClickForgotPassword}
          >Forgot your password?</button>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="font-bold tracking-widest bg-primary disabled:bg-primary-400 py-2 px-8"
            disabled={submitting || (identifier === '' && password === '')}
            onClick={handleSubmit}
          >{submitting ? 'SIGNING IN' : 'SIGN IN'}</button>
        </div>
      </form>
    </div>
  )
}

const ForgotPasswordForm = ({ onClickBackButton }) => {
  const [email, setEmail] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submittingErrorMessage, setSubmittingErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)

      alert('Thank you, if this email is registered you will receive a message with a link for updating your password.')
    }, 1000)


    // const data = { email }

    // API.post('auth/forgot-password', data).then((response) => {
    //   console.log('response', response)
    // }).catch((error) => {
    //   if (error.response) {
    //     setSubmittingErrorMessage(error.response.data.data[0].messages[0].message)
    //   } else {
    //     setSubmittingErrorMessage('Unexpected error occured')
    //   }
    // }).finally(() => {
    //   setSubmitting(false)
    // })
  }

  return (
    <div>
      <h3 className="text-20/16 font-medium leadidng-none">FORGOT YOUR PASSWORD?</h3>

      <p className="mt-3">Please enter the email address you registered with. We will send you a link for changing your password.</p>

      {submittingErrorMessage && (
        <p className="mt-3 text-red-500">{submittingErrorMessage}</p>
      )}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label
            htmlFor="sign-in-popover-email"
            className="font-semibold "
          >EMAIL*</label>

          <input
            type="email"
            id="sign-in-popover-email"
            className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="italic underline p-1"
            onClick={onClickBackButton}
          >Back to sign in</button>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="font-bold tracking-widest bg-primary disabled:bg-primary-400 py-2 px-8"
            disabled={submitting}
            onClick={handleSubmit}
          >{submitting ? 'SENDING' : 'SEND'}</button>
        </div>
      </form>
    </div>
  )
}

const NavbarPopoverSignIn = ({ onClickSignUpButton }) => {
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-12 py-8 px-12">

      {!showForgotPasswordForm && (
        <SignInForm
          onClickForgotPassword={() => setShowForgotPasswordForm(true)}
        />
      )}

      {showForgotPasswordForm && (
        <ForgotPasswordForm
          onClickBackButton={() => setShowForgotPasswordForm(false)}
        />
      )}

      <div>
        <h3 className="text-20/16 font-medium leadidng-none">SIGN UP NOW</h3>
        <p className="mt-3">Create an account to enjoy a personalised shopping experience:</p>

        <dl className="space-y-1.5 mt-4">
          <dt className="flex items-center justify-start gap-2"><RiMailLine /> Receive Fendi Newsletters</dt>
          <dt className="flex items-center justify-start gap-2"><RiHeart3Line /> Create a Wish List</dt>
          <dt className="flex items-center justify-start gap-2"><RiHandbagLine /> Speed up checkout</dt>
          <dt className="flex items-center justify-start gap-2"><RiArrowGoBackLine /> Follow orders and returns</dt>
        </dl>

        <p className="mt-4">Before providing your details, please read the <a className="underline" href="https://www.fendi.com/tr/info/legal-area/privacy-policy?section=legal_privacy_account">Fendi & Me Privacy Policy</a></p>

        <div className="mt-4">
          <button
            className="font-bold tracking-widest bg-primary py-2 px-8"
            onClick={onClickSignUpButton}
          >SIGN UP NOW</button>
        </div>
      </div>

    </div>
  )
}

export default NavbarPopoverSignIn
