import Head from 'next/head'
import Link from 'next/link'

import { useState } from 'react'
import { includes } from 'lodash'
import classNames from 'classnames'

import {
  RiMailLine,
  RiPrinterLine
} from 'react-icons/ri'

import { numberWithCommas } from '../../utils/utils'

import useProducts from '../../hooks/useProducts'

const SignUpMessage = () => (
  <div className="flex flex-col items-center justify-center text-center gap-4 bg-gray-100 p-4">
    <h3>SAVE FOR NEXT TIME?</h3>

    <p>Register or log in to save your Wish List in your account, making it visible at any time, from any device.</p>

    <Link href="/auth/sign-up">
      <a className="font-bold tracking-widest bg-primary py-2 px-8">SIGN UP NOW</a>
    </Link>
  </div>
)

const Product = ({ product, checked, onCheck }) => {
  const href = `/product/${product.id}`
  const src = `${process.env.API_HOST}${product.images[0].formats.medium.url}`

  return (
    <div className="flex items-start justify-start gap-4 border-b py-6">
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
        />
      </div>

      <div className="w-full max-w-28">
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

        <cite className="block mt-1">{`Product Code: ${product.code}`}</cite>

        <h6 className="font-semibold tracking-wide mt-1">TRY {numberWithCommas(product.price.toFixed(2))}</h6>

        <p className="mt-1">Colour: Orange</p>
        <p className="mt-1">Saved on 5/9/21</p>

        <button
          className="font-bold tracking-widest bg-primary py-2 px-8 mt-6"
          onClick={() => console.log('add to shopping bag', product.title, product.code)}
        >ADD TO SHOPPING BAG</button>
      </div>
    </div>
  )
}

const PageWishlist = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const [selectedProducts, setSelectedProducts] = useState([])

  const products = useProducts()

  const handleSelectAllProducts = (e) => {
    const { checked } = e.target

    if (checked) {
      setSelectedProducts(products.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleCheckProduct = (product, checked) => {
    console.log('handleCheckProduct', checked, product.title, product.code)

    if (checked) {
      setSelectedProducts((prev) => [...prev, product.id])
    } else {
      setSelectedProducts((prev) => prev.filter((p) => p !== product.id))
    }
  }

  const handleRemoveSelectedProducts = (e) => {
    e.preventDefault()

    alert(`remove ${JSON.stringify(selectedProducts)}`)
  }

  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>

      <>
        <div className="container mx-auto">
          <header className="flex flex-col items-center justify-center py-5">
            <h1 className="text-22/16 tracking-widest text-gray-600">FENDI & ME</h1>
          </header>

          <div className="grid grid-cols-12 gap-8 border-t py-4">

            <aside className="col-span-4">
              <SignUpMessage />
            </aside>

            <main className="col-span-8">
              <nav className="grid grid-cols-2 bg-gray-100 pt-2">
                <button
                  className={classNames('text-center text-16/16 py-2', {
                    'bg-white': selectedTabIndex === 0
                  })}
                  onClick={() => setSelectedTabIndex(0)}
                >MY WISHLIST</button>

                <button
                  className={classNames('text-center text-16/16 py-2', {
                    'bg-white': selectedTabIndex === 1
                  })}
                  onClick={() => setSelectedTabIndex(1)}
                >SUGGESTIONS</button>
              </nav>

              <div>
                <header className="w-full h-14 flex items-center">
                  <div className="flex items-center justify-start gap-5">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAllProducts}
                    />

                    <button
                      className="text-gray-400 font-semibold tracking-widest underline p-1"
                      onClick={handleRemoveSelectedProducts}
                    >Remove</button>
                  </div>

                  <div className="flex-1 flex items-center justify-end gap-2">
                    <button className="text-16/16 p-2"><RiMailLine /></button>

                    <button className="text-16/16 p-2"><RiPrinterLine /></button>
                  </div>
                </header>

                <main
                  className={classNames('border-t py-4', {
                    'grid grid-cols-2': selectedTabIndex === 0,
                  })}
                >
                  {selectedTabIndex === 0 && products.map((product) => 
                    <Product
                      key={product.id}
                      product={product}
                      checked={includes(selectedProducts, product.id)}
                      onCheck={(e) => handleCheckProduct(product, e.target.checked)}
                    />
                  )}

                  {selectedTabIndex === 1 && (
                    <div>suggestions will be here</div>
                  )}
                </main>
              </div>
            </main>

          </div>
        </div>
      </>
    </>
  )
}

export default PageWishlist
