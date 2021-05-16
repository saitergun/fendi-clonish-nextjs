import Link from 'next/link'

import { useRef, useEffect } from 'react'
import { useClickAway } from 'react-use'
import { RiHandbagLine } from 'react-icons/ri'

import { numberWithCommas } from '../utils/utils'

import useProduct from '../hooks/useProducts'

const ProductBag = ({ product }) => {
  const href = `/product/${product.id}`
  const src = `${process.env.API_HOST}${product.images[0].formats.medium.url}`

  return (
    <div className="flex items-start justify-start gap-4 border-b py-4">
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

      <div className="flex-1 flex-col items-center justify-center text-center">
        <Link href={href}>
          <a><h3 className="font-bold text-11/16 hover:underline">{product.title}</h3></a>
        </Link>

        <h6 className="font-semibold tracking-wide text-11/16 mt-1">TRY {numberWithCommas(product.price.toFixed(2))}</h6>

        <p className="text-10/16 mt-1">Size: 38 EU</p>
        <p className="text-10/16">Quantity: 1</p>

        <button
          className="font-bold underline tracking-widest text-11/16 py-2 px-8"
          onClick={() => console.log('REMOVE', product.title, product.code)}
        >REMOVE</button>
      </div>
    </div>
  )
}

const ProductSuggestion = ({ product }) => {
  const href = `/product/${product.id}`
  const src = `${process.env.API_HOST}${product.images[0].formats.medium.url}`

  return (
    <div className="flex items-start justify-start gap-4 border-t py-4">
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

      <div className="flex-1 flex-col items-center justify-center text-center">
        <Link href={href}>
          <a><h3 className="font-bold text-11/16 hover:underline">{product.title}</h3></a>
        </Link>

        <h6 className="font-semibold tracking-wide text-11/16 mt-1">TRY {numberWithCommas(product.price.toFixed(2))}</h6>

        <button
          className="font-bold underline text-10/16 py-2 px-8 mt-4"
          onClick={() => console.log('ADD TO SHOPPING BAG', product.title, product.code)}
        >ADD TO SHOPPING BAG</button>
      </div>
    </div>
  )
}

const NavbarShoppingBagDrawer = ({ onClose }) => {
  const products = useProduct()

  const containerRef = useRef()

  useClickAway(containerRef, () => {
    if (onClose) {
      onClose()
    }
  })

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-hidden z-10">
      <div
        className="absolute top-0 right-0 bottom-0 w-full max-w-md h-full flex flex-col bg-white"
        ref={containerRef}
      >

        <div className="h-1/2 flex flex-col">
          <header className="flex items-center justify-center gap-4 p-4">
            <h3 className="font-bold">SHOPPING BAG</h3>

            <span className="block relative">
              <RiHandbagLine className="text-16/16" />

              <span className="absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center leading-none text-9/16 font-semibold rounded-full bg-primary">3</span>
            </span>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {products.slice(0, 3).map((product) => (
              <ProductBag
                key={product.id}
                product={product}
              />
            ))}
          </main>

          <footer className="flex flex-col items-center justify-center gap-2 p-4">
            <h6 className="font-bold text-14/16">TOTAL: TRY 45,950.00</h6>

            <Link href="/checkout">
              <a className="w-full text-center font-bold leading-none bg-primary hover:bg-primary-400 transition-colors duration-100 ease-in py-4 px-4">
                CHECK OUT
              </a>
            </Link>

            <Link href="/cart">
              <a className="underline">or review your Shopping Bag</a>
            </Link>
          </footer>
        </div>

        <div className="w-full h-1/2 overflow-y-auto px-4">
          <header className="flex items-center justify-center border-t py-4">
            <h3 className="font-bold">SUGGESTIONS</h3>
          </header>

          <main className="">
            {products.map((product) => (
              <ProductSuggestion
                key={product.id}
                product={product}
              />
            ))}
          </main>
        </div>

      </div>
    </div>
  )
}

export default NavbarShoppingBagDrawer
