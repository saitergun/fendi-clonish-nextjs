import Link from 'next/link'

import { useState } from 'react'

import {
  RiArrowLeftLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseLine,
} from 'react-icons/ri'

import { numberWithCommas } from '../../utils/utils'

import useProducts from '../../hooks/useProducts'

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
  const href = `/product/${product.id}`;
  const src = `${process.env.API_HOST}${product.images[0].formats.medium.url}`;

  return (
    <div className="grid grid-cols-12 gap-4 py-4 border-b">
      <div className="col-span-2">
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

      <div className="col-span-5 flex flex-col items-start">
        <Link href={href}>
          <a><h3 className="font-bold hover:underline">{product.title}</h3></a>
        </Link>

        <cite className="block mt-1">{`Product Code: ${product.code}`}</cite>

        <h6 className="font-semibold mt-1">TRY {numberWithCommas(product.price.toFixed(2))}</h6>

        <p className="mt-1">Size: 38 EU</p>
        <p>Colour: White</p>
      </div>

      <div className="col-span-2 flex items-start justify-center">
        <select
          className="bg-gray-100 py-2 px-2"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>

      <div className="col-span-2 flex items-start justify-end">
        <h6 className="font-semibold text-15/16">TRY {numberWithCommas(product.price.toFixed(2))}</h6>
      </div>

      <div className="col-span-1 flex items-start justify-end">
        <button className="text-16/16 p-1" onClick={() => console.log('remove product from cart')}>
          <RiCloseLine />
        </button>
      </div>
    </div>
  )
}

const PageCart = () => {
  const products = useProducts()

  const products2 = products.slice(0, 6)

  return (
    <>
      <div className="container grid grid-cols-12 gap-4 p-4 mx-auto">

        <div className="col-span-8">
          <header className="relative flex items-center justify-center text-center">
            <Link href="/">
              <a className="absolute left-0 top-0 flex items-center justify-start gap-1 whitespace-pre"><RiArrowLeftLine /> Back to Shopping</a>
            </Link>

            <h1 className="text-25/16 tracking-widest">SHOPPING BAG</h1>
          </header>

          <main className="mt-4">
            <div className="px-4">
              {products2.length > 0 && products2.map((product) =>
                <Product key={product.id} product={product} />
              )}
            </div>

            <ul className="flex flex-col bg-gray-100 text-14/16 gap-1.5 p-4 mt-2">
              <li className="flex items-center justify-between">
                <span>SUBTOTAL ({products2.length} ITEMS)</span>

                <span className="text-right">TRY {numberWithCommas(products2.reduce((pre, cur) => pre + cur.price, 0))}</span>
              </li>

              <li className="flex items-center justify-between">
                <span>DUTIES & TAX</span>

                <span className="text-right">TRY 0.00</span>
              </li>

              <li className="flex items-center justify-between font-semibold">
                <span>TOTAL</span>

                <span className="text-right">TRY {numberWithCommas(products2.reduce((pre, cur) => pre + cur.price, 0))}</span>
              </li>
            </ul>

            <div className="flex justify-end mt-4">
              <Link href="/checkout">
                <a className="w-1/2 text-center font-bold bg-primary hover:bg-primary-400 transition-colors duration-100 ease-in py-4 px-4">CHECKOUT</a>
              </Link>
            </div>
          </main>
        </div>

        <aside className="space-y-px col-span-4">

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

        </aside>

      </div>
    </>
  )
}

export default PageCart
