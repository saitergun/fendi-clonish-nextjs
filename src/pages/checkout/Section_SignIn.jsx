import Link from 'next/link'

import { useState } from 'react'
import classNames from 'classnames'

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
    <div className="max-w-3xl py-4">
      <p>Log in to use your saved addresses and add this order to your account.</p>

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
            className="w-full h-10 bg-transparent border border-black py-1 px-2 mt-2"
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
            className="w-full h-10 bg-transparent border border-black py-1 px-2 mt-2"
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
            className="underline p-1"
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

        <div className="mt-4">
          <p>Do you have an account? <Link href="/auth/sign-up"><a className="font-semibold underline">Sign Up Now</a></Link></p>
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
    <div className="max-w-3xl py-4">
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
            className="w-full h-10 bg-transparent border border-black py-1 px-2 mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="font-semibold underline p-1"
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

        <div className="mt-4">
          <p>Do you have an account? <Link href="/auth/sign-up"><a className="font-semibold underline">Sign Up Now</a></Link></p>
        </div>
      </form>
    </div>
  )
}

const NewToFendi = () => {
  const [email, setEmail] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submittingError, setSubmittingError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('handle submit shop a guest')
  }

  return (
    <div className="max-w-3xl">
      <div className="py-8">
        <h3 className="text-20/16 font-medium leadidng-none">NEW CUSTOMER</h3>

        <p className="mt-3">Create an account to speed up checkout, make order tracking easier and save your preference for next time.</p>

        <div className="mt-8">
          <Link href="/auth/sign-up"><a className="font-bold tracking-widest bg-primary disabled:bg-primary-400 py-2 px-8">SIGN UP NOW</a></Link>
        </div>
      </div>

      <div className="border-t py-8">
        <h3 className="text-20/16 font-medium leadidng-none">SHOP AS GUEST</h3>

        <p className="mt-3">Would you prefer not to register? Enter your email address in order to receive updates on your order and proceed with your purchase. Before providing us with your data, read the <a className="font-semibold underline" href="https://www.fendi.com/tr/info/legal-area/privacy-policy" target="_blank">Online shop Privacy Policy.</a></p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            <label
              htmlFor="sign-in-popover-email"
              className="font-semibold "
            >EMAIL*</label>

            <input
              type="email"
              id="sign-in-popover-email"
              className="w-full h-10 bg-transparent border border-black py-1 px-2 mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <h6 className="font-semibold">NEWSLETTER</h6>

            <p className="mt-2">If you wish, you may subscribe to our newsletter and receive updates on FENDI branded products, services, initiatives and events. Consult the <a className="font-semibold underline" href="https://www.fendi.com/tr/info/legal-area/privacy-policy" target="_blank">Newsletter Privacy Policy</a> for further information.</p>

            <label className="flex items-center gap-3 mt-2">
              <input type="checkbox" />

              <span>I want to receive the Fendi Newsletter</span>
            </label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="font-bold tracking-widest bg-primary disabled:bg-primary-400 py-2 px-8"
              disabled={submitting}
              onClick={handleSubmit}
            >{submitting ? 'PROCEEDING' : 'PROCEED'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SectionSignIn = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)

  return (
    <>
      <nav className="grid grid-cols-2 bg-gray-100 pt-1 mt-4">
        <button
          className={classNames('text-left text-13/16 font-semibold py-8 px-4 focus:outline-none', {
            'bg-white': selectedTabIndex === 0
          })}
          onClick={() => setSelectedTabIndex(0)}
        >ALREADY REGISTERED?</button>

        <button
          className={classNames('text-left text-13/16 font-semibold py-8 px-4 focus:outline-none', {
            'bg-white': selectedTabIndex === 1
          })}
          onClick={() => setSelectedTabIndex(1)}
        >NEW TO FENDI</button>
      </nav>

      {selectedTabIndex === 0 && !showForgotPasswordForm && (
        <SignInForm onClickForgotPassword={() => setShowForgotPasswordForm(true)} />
      )}

      {selectedTabIndex === 0 && showForgotPasswordForm && (
        <ForgotPasswordForm onClickBackButton={() => setShowForgotPasswordForm(false)} />
      )}

      {selectedTabIndex === 1 && (
        <NewToFendi />
      )}
    </>
  )
}

export default SectionSignIn
