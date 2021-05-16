import { useState, useRef } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import { shuffle } from 'lodash'

import {
  RiSearch2Line,
  RiCloseLine,
  RiArrowRightLine,
} from 'react-icons/ri'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import useProducts from '../hooks/useProducts'

import CardProduct from './CardProduct'

const ProductSlider = ({ products, title }) => {
  return (
    <div className="pb-6">
      {title && (
        <h3 className="text-center font-bold text-14/16">{title}</h3>
      )}

      <Slider
        dots={true}
        draggable={true}
        touchMove={true}
        infinite={false}
        arrows={false}
        speed={500}
        slidesToShow={4}
        slidesToScroll={4}
      >
        {products.map((product) => {
          return (
            <div className="p-4" key={product.id}>
              <CardProduct product={product} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

const CloseButton = ({ onClick }) => (
  <button
    className="flex items-center justify-center gap-2 py-1 px-2"
    onClick={onClick}
  >
    <span className="font-bold tracking-wide leading-none">CLOSE</span>

    <RiCloseLine className="text-24/16 font-thin" />
  </button>
)

const SearchBar = ({ onClickCloseButton }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center p-5">
        <form
          className="flex items-center justify-between gap-3 text-gray-400 text-14/16 border-b border-gray-400 p-1"
          action="/search"
        >
          <RiSearch2Line />

          <input
            name="q"
            className="min-w-80 flex-1 bg-transparent placeholder-gray-400 tracking-widest uppercase focus:outline-none"
            placeholder="Search For"
          />

          <RiArrowRightLine />
        </form>
      </div>

      <div className="absolute top-0 right-4 bottom-0 flex items-center justify-end">
        <CloseButton onClick={onClickCloseButton} />
      </div>
    </div>
  )
}

const ProductsBarButton = ({ text, active, onClick }) => (
  <button
    className="text-16/16 focus:outline-none py-1 px-8"
    onClick={onClick}
  >
    <span
      className={classNames('block leading-none tracking-widest border-b', {
        'text-gray-400 border-transparent': !active,
        'text-gray-800 font-medium border-primary': active,
      })}
    >{text}</span>
  </button>
)

const ProductsBarButtonSeperator = () => (
  <span className="block w-1.5 self-stretch border-2 border-t-4 border-b-4 border-white bg-gray-100" />
)

const ProductsBar = () => {
  const [selectedSliderIndex, setSelectedSliderIndex] = useState(0)

  const sliderRef = useRef()

  const products = useProducts()

  return (
    <div>
      <div className="flex items-center justify-center border-t py-8">
        <ProductsBarButton active={selectedSliderIndex === 0} onClick={() => sliderRef.current.slickGoTo(0)} text="Woman" />
        <ProductsBarButtonSeperator />
        <ProductsBarButton active={selectedSliderIndex === 1} onClick={() => sliderRef.current.slickGoTo(1)} text="Man" />
        <ProductsBarButtonSeperator />
        <ProductsBarButton active={selectedSliderIndex === 2} onClick={() => sliderRef.current.slickGoTo(2)} text="Recently viewed" />
      </div>

      <Slider
        dots={false}
        draggable={false}
        touchMove={false}
        infinite={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        ref={sliderRef}
        className="max-w-7xl mx-auto pb-8"
        beforeChange={(current, next) => setSelectedSliderIndex(next)}
      >
        <ProductSlider products={shuffle(products.slice(0, 8))} title="MOST WANTED" />

        <ProductSlider products={shuffle(products.slice(0, 8))} title="MOST WANTED" />

        <ProductSlider products={shuffle(products.slice(0, 3))} />
      </Slider>
    </div>
  )
}

const NavbarPopoverSearch = ({ onClickCloseButton }) => {
  return (
    <>
      <SearchBar onClickCloseButton={onClickCloseButton} />

      <ProductsBar />
    </>
  )
}

export default NavbarPopoverSearch
