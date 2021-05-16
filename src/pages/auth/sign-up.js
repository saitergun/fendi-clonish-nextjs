import Head from 'next/head'

import { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import API from '../../utils/api'

const INITIAL_VALUES = {
  title: '',
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  birthday: '',
  newsletter: false,
}

const PageAuthSignUp = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submittingErrorMessage, setSubmittingErrorMessage] = useState(null)

  const handleSubmit = (values) => {
    setSubmitting(true)
    setSubmittingErrorMessage(null)

    const { password, passwordConfirmation } = values

    if (password !== passwordConfirmation) {
      setSubmitting(false)
      setSubmittingErrorMessage(`Passwords doesn't match`)

      return false
    }

    const data = {
      ...values,
      blocked: false,
    }

    delete data.passwordConfirmation

    API.post('auth/local/register', data).then((response) => {
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
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <>
        <div className="container mx-auto py-8 px-4">
          <div className="w-1/2">
            <h3 className="text-20/16 font-medium leadidng-none">SIGN UP</h3>

            <p className="mt-4">Create an account to enjoy a personalised shopping experience:</p>

            {submittingErrorMessage && (
              <p className="mt-4 text-red-500">{submittingErrorMessage}</p>
            )}

            <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
              <Form className="space-y-8 mt-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start">
                      <label htmlFor="title" className="font-semibold">TITLE *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="title"
                        name="title"
                        component="select"
                        required
                      >
                        <option value=""></option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Miss">Miss</option>
                        <option value="Mr">Mr</option>
                      </Field>
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="name" className="font-semibold">NAME *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="name"
                        name="name"
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="surname" className="font-semibold">SURNAME *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="surname"
                        name="surname"
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="birthday" className="font-semibold">BIRTHDAY *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="birthday"
                        name="birthday"
                        type="date"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start">
                      <label htmlFor="username" className="font-semibold">USERNAME *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="username"
                        name="username"
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="email" className="font-semibold">EMAIL *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="password" className="font-semibold">PASSWORD *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label htmlFor="passwordConfirmation" className="font-semibold">PASSWORD CONFIRMATION *</label>

                      <Field
                        className="w-full h-10 bg-gray-100 py-1 px-2 mt-2"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <label htmlFor="newsletter" className="font-semibold">NEWSLETTER *</label>

                  <label className="flex items-center gap-3 font-semibold mt-3">
                    <Field
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                    />

                    <span>I want to receive the newsletter for Fendi products</span>
                  </label>

                  <cite className="mt-2">Your personal data will be used by Fendi S.r.l. to provide the Newsletter service expressly requested by you. Please consult the <a className="font-semibold underline" href="https://www.fendi.com/tr/info/legal-area/privacy-policy?section=legal_privacy_nl">Privacy Information Notice</a> for further information.</cite>
                </div>

                <div>
                  <button
                    type="submit"
                    className="font-bold tracking-widest bg-primary disabled:bg-primary-400 py-2 px-8"
                    disabled={submitting}
                  >{submitting ? 'SIGNING UP' : 'SIGN UP'}</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    </>
  )
}

export default PageAuthSignUp
