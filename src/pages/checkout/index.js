import Link from 'next/link'

import { useState } from 'react'
import classNames from 'classnames'

import {
  RiArrowLeftLine,
  RiArrowDownSLine,
  RiArrowUpSLine
} from 'react-icons/ri'

import { numberWithCommas } from '../../utils/utils'

import useProducts from '../../hooks/useProducts'

import SignIn from './Section_SignIn'

const CreditCard = ({ text }) => (
  <div className="flex items-center justify-start gap-2">
    <span className="block w-10 h-6 bg-gray-700 rounded-sm" />

    <span>{text}</span>
  </div>
)

const Accordion = ({ children, title, open }) => {
  const [showContent, setShowContent] = useState(open ?? true)

  return (
    <>
      <div className="bg-gray-100">
        <header
          className="flex items-center justify-between py-3 px-4 cursor-pointer select-none"
          onClick={() => setShowContent((prev) => !prev)}
        >
          <span className="w-full flex-1 flex items-center justify-start gap-2">
            <span className="block font-semibold leading-none">{title}</span>
          </span>

          {showContent ? (
            <RiArrowDownSLine className="text-16/16 text-gray-500" />
          ) : (
            <RiArrowUpSLine className="text-16/16 text-gray-500" />
          )}
        </header>

        {showContent && (
          <main className="pb-4 px-4">{children}</main>
        )}
      </div>
    </>
  )
}

const Product = ({ product }) => {
  const href = `/product/${product.id}`
  const src = `${process.env.API_HOST}${product.images[0].formats.medium.url}`

  return (
    <div className="flex items-start justify-start gap-4 border-b py-6">
      <div className="w-full max-w-16">
        <Link href={href}>
          <a>
            <img
              className="block w-full h-auto"
              src={src}
              alt={product.name}
            />
          </a>
        </Link>
      </div>

      <div className="flex-1 flex-col items-start justify-start">
        <Link href={href}>
          <a><h3 className="font-bold hover:underline">{product.title}</h3></a>
        </Link>

        <cite className="block mt-1">{`Code: ${product.code}`}</cite>

        <p className="mt-1">Colour: Yellow</p>
        <p className="mt-1">Quantity: 1</p>
      </div>
    </div>
  )
}

const Sidebar = () => {
  const products = useProducts()

  const products2 = products.slice(0, 3)

  return (
    <>
      <Accordion title="YOUR SHOPPING BAG">
        <p>You have {products2.length} item in your Shopping Bag</p>

        {products.length > 0 && (
          <div>
            {products2.map((product) => 
              <Product key={product.id} product={product} />
            )}
          </div>
        )}

        <ul className="flex flex-col gap-1.5 py-4">
          <li className="flex items-center justify-between">
            <span>{products2.length} ITEMS</span>

            <span className="text-right">TRY {numberWithCommas(products2.reduce((pre, cur) => pre + cur.price, 0))}</span>
          </li>

          <li className="flex items-center justify-between">
            <span>FREE SHIPPING</span>

            <span className="text-right">TRY 0.00</span>
          </li>

          <li className="flex items-center justify-between font-semibold">
            <span>TOTAL</span>

            <span className="text-right">TRY {numberWithCommas(products2.reduce((pre, cur) => pre + cur.price, 0))}</span>
          </li>
        </ul>

        <div className="text-center border-t pt-4">
          <Link href="/cart">
            <a className="font-semibold underline">Modify Shopping Cart</a>
          </Link>
        </div>
      </Accordion>

      <div className="space-y-px mt-4">
        <Accordion title="FREE SHIPPING AND RETURNS">
          <p>Enjoy free delivery on all orders.</p>
          <p>Shop with confidence: returns can be requested within 14 days. Please note it is not possible to return personalised items. Please note it is not possible to return personalised items.</p>
        </Accordion>

        <Accordion title="CAN WE HELP?">
          <p>Call us at +39 0633450130 for any questions or to place your order with us by phone (Mon-Fri, 10am-7pm CET)</p>
        </Accordion>

        <Accordion title="SECURE PAYMENTS">
          <p>We ensure the highest security level for all transactions through the use of the most advanced codification systems.</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <CreditCard text="Mastercard" />
            <CreditCard text="Visa" />
            <CreditCard text="American Express" />
            <CreditCard text="Maestro" />
            <CreditCard text="PAYPAL" />
          </div>
        </Accordion>

        <Accordion title="ONLINE SHOP SALES CONDITIONS AND PRIVACY POLICY">
          <p>Read our full Terms and Conditions of Sale and Privacy Policy.</p>
        </Accordion>
      </div>
    </>
  )
}

const SectionTitle = ({ number, text, active }) => {
  return (
    <header className="flex items-center gap-3">
      <div
        className={classNames('w-8 h-8 flex items-center justify-center font-semibold rounded-full', {
          'bg-primary': active,
          'bg-gray-200': !active,
        })}
      >{number}</div>

      <h1 className="flex items-center justify-start gap-4 text-24/16 font-medium tracking-widest">{text}</h1>
    </header>
  )
}

const PageCheckout = () => {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <>
      <div className="container p-4 mx-auto">
        <div>
          <Link href="/cart">
            <a className="flex items-center justify-start gap-1 whitespace-pre"><RiArrowLeftLine /> Back to Shopping Bag</a>
          </Link>
        </div>

        {!signedIn && (
          <div className="max-w-5xl mx-auto mt-4">
            <SectionTitle number={1} text="SIGN IN" active />

            <SignIn />
          </div>
        )}

        {signedIn && (
          <div className="max-w-5xl mx-auto grid grid-cols-12 gap-4 mt-4">
            <main className="col-span-8 space-y-6">
              <div>
                <SectionTitle number={1} text="SIGN IN" />

                <div className="bg-gray-100 p-4 mt-4">
                  <p>Your email is <strong>foo@bar</strong></p>
                </div>
              </div>

              <div>
                <SectionTitle number={2} text="SHIPPING" />

                <div className="bg-gray-100 p-4 mt-4">
                  <p>shipping info/form will be here</p>
                </div>
              </div>

              <div>
                <SectionTitle number={3} text="PAYMENT" active />

                <div className="bg-gray-100 p-4 mt-4">
                  <p>payment info/form will be here</p>
                </div>
              </div>
            </main>

            <aside className="col-span-4">
              <Sidebar />
            </aside>
          </div>
        )}
      </div>

      <div className="fixed left-2 bottom-2 flex gap-2">
        <button
          className="text-12/16 text-gray-700 p-1"
          onClick={() => setSignedIn(!signedIn)}
        >{signedIn ? 'sign out' : 'sign in'}</button>
      </div>
    </>
  )
}

export default PageCheckout
