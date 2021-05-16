import Link from 'next/link'

import { useState } from 'react'

import {
  RiHeart3Line,
} from 'react-icons/ri'

import { numberWithCommas } from '../utils/utils'

const CardProduct = ({ product, hoverableImages }) => {
  const [isHover, setIsHover] = useState(false)

  const href = `/product/${product.id}`;
  const src1 = `${process.env.API_HOST}${product.images[0].formats.medium.url}`;
  const src2 = `${process.env.API_HOST}${product.images[1].formats.medium.url}`;

  return (
    <div
      className="flex flex-col gap-4 border border-transparent hover:border-primary"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {product.images.length > 0 && (
        <div className="relative">
          <Link href={href}>
            <a>
              <img
                className="block w-full h-auto"
                src={hoverableImages && isHover ? src1 : src2}
                alt={product.name}
              />
            </a>
          </Link>

          {isHover && (
            <button className="absolute top-1 right-1 p-3">
              <RiHeart3Line className="text-18/16" />
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-center text-center px-1 pb-6">
        <h6 className="font-bold">{product.title}</h6>

        <Link href={href}>
          <a><h3 className="hover:underline">{product.name}</h3></a>
        </Link>

        <h6 className="font-semibold tracking-wide mt-4">TRY {numberWithCommas(product.price.toFixed(2))}</h6>
      </div>
    </div>
  )
}

export default CardProduct
