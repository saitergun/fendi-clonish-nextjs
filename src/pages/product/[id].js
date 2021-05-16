import Head from 'next/head'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import classNames from 'classnames'

import {
  RiLayoutGridLine,
  RiLayoutRowLine,
  RiHeart3Line,
  RiMapPin2Line,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiRulerLine,
  RiPhoneLine,
  RiTruckLine,
  RiArrowGoBackLine,
  RiBookOpenLine,
  RiStore2Line,
} from 'react-icons/ri'

import { getRandomBenefit, numberWithCommas } from '../../utils/utils'

const Accordion = ({ children, icon, title, open }) => {
  const [showContent, setShowContent] = useState(open ?? false)

  return (
    <>
      <div className={classNames('border-b px-2')}>
        <header
          className="flex items-center justify-between py-3 cursor-pointer select-none"
          onClick={() => setShowContent((prev) => !prev)}
        >
          <span className="w-full flex-1 flex items-center justify-start gap-2">
            {icon}

            <span className="block font-semibold tracking-wider">{title}</span>
          </span>

          {showContent ? (
            <RiArrowDownSLine className="text-16/16 text-gray-500" />
          ) : (
            <RiArrowUpSLine className="text-16/16 text-gray-500" />
          )}
        </header>

        {showContent && (
          <main className="py-4 px-6">{children}</main>
        )}
      </div>
    </>
  )
}

const Service = ({ icon, title, description, link, linkText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center tracking-widest">
      <div className="text-18/16">{icon}</div>

      <h4 className="mt-4">{title}</h4>
      <p className="mt-1">{description}</p>

      <Link href={link}>
        <a className="font-semibold underline mt-2">{linkText}</a>
      </Link>
    </div>
  )
}

const PageProduct = ({ product }) => {
  const [benefit, setBenefit] = useState('')
  const [galleryType, setGalleryType] = useState(0)

  useEffect(() => {
    setBenefit(getRandomBenefit())

    const interval = setInterval(() => {
      setBenefit(getRandomBenefit())
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!product) {
    return null
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <>
        <div className="container mx-auto">
          <nav className="relative flex items-center justify-between border-b border-gray-200 py-3 px-4">
            <ul className="flex items-center justify-start tracking-wide gap-2 z-1">
              <li>{product.category.name_full}</li>
            </ul>

            <span className="absolute inset-0 w-full h-full flex-1 flex items-center justify-center gap-2">
              <button
                className={classNames('p-2', {
                  'text-gray-400': galleryType === 1
                })}
                onClick={() => setGalleryType(0)}
              ><RiLayoutGridLine className="text-20/16" /></button>

              <span className="w-0.5 h-4 block bg-gray-200" />

              <button
                className={classNames('p-2', {
                  'text-gray-400': galleryType === 0
                })}
                onClick={() => setGalleryType(1)}
              ><RiLayoutRowLine className="text-20/16" /></button>
            </span>

            <span className="flex items-center justify-end z-1">
              <p>{benefit}</p>
            </span>
          </nav>

          <div className="grid grid-cols-12 gap-8 px-4 mt-8">
            <main
              className={classNames('grid col-span-8 gap-8', {
                'grid-cols-2': galleryType === 0
              })}
            >
              {product.images.map((image) => {
                const src = `${process.env.API_HOST}${image.formats.large.url}`;
                const href = `${process.env.API_HOST}${image.url}`;
                const paddingTop = `${image.formats.large.height * 100 / image.formats.large.width}%`

                return (
                  <div
                    key={image.id}
                    className="bg-gray-100 w-full relative overflow-hidden"
                    style={{
                      paddingTop,
                    }}
                  >
                    <img
                      className="absolute inset-0 w-full h-full"
                      src={src}
                      alt=""
                    />
                  </div>
                );
              })}
            </main>

            <aside className="col-span-4">
              <div className="mb-5">
                <h1 className="text-16/16 font-semibold tracking-widest">{product.title}</h1>

                <h2 className="tracking-widest mt-1">{product.name}</h2>

                <h3 className="italic">Code: {product.code}</h3>

                <h6 className="font-semibold tracking-wide text-16/16 mt-2">TRY {numberWithCommas(product.price.toFixed(2))}</h6>
              </div>

              <div className="mb-5">
                <p className="tracking-wide whitespace-pre-line">{product.short_description}</p>
              </div>

              <div className="mb-5">
                <button className="w-full font-bold bg-primary hover:bg-primary-400 transition-colors duration-100 ease-in py-4 px-4">
                  ADD TO SHOPPING BAG
                </button>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button className="flex items-center justify-center gap-3 border border-black tracking-widest py-4 px-4 font-bold">
                    <RiMapPin2Line className="text-16/16" /> <span>FIND IN STORE</span>
                  </button>

                  <button className="flex items-center justify-center gap-3 border border-black tracking-widest py-4 px-4">
                    <RiHeart3Line className="text-16/16" /> <span>WISHLIST</span>
                  </button>
                </div>
              </div>

              <div className="block border-t">
                <Accordion
                  title="PRODUCT INFORMATION"
                  icon={<RiRulerLine className="text-16/16 text-gray-500" />}
                  open
                >
                  <ul>
                    <li><strong>Product Code:</strong> 8BZ038A5TLF13VK</li>
                    <li><strong>Length:</strong> 21, cm</li>
                    <li><strong>Height:</strong> 25, cm</li>
                    <li><strong>Depth:</strong> 10, cm</li>
                    <li><strong>Weight:</strong> 0,606 kg</li>
                    <li><strong>Composition:</strong> 100% CALF LEATHER, Inside: 61% COTTON, 32% POLYESTER, 7% POLYURETHANE</li>
                  </ul>
                </Accordion>

                <Accordion
                  title="SHIPPING AND RETURNS"
                  icon={<RiTruckLine className="text-16/16 text-gray-500" />}
                >
                  <ul>
                    <li><strong>Free Shipping on all orders</strong></li>
                    <li><strong>Express shipping in 4-6 business days</strong></li>
                    <li><strong>Free returns within 14 days</strong></li>
                  </ul>
                </Accordion>

                <Accordion
                  title="CONTACT US"
                  icon={<RiPhoneLine className="text-16/16 text-gray-500" />}
                >
                  <ul>
                    <li><a className="hover:underline" href="tel:+390633450130">Contact us +39 0633450130</a></li>
                  </ul>
                </Accordion>
              </div>
            </aside>
          </div>

          <div className="border-t py-8 px-4 mt-8">
            <h3 className="text-center text-20/16 tracking-widest">PREMIUM SERVICES</h3>

            <div className="grid grid-cols-4 gap-6 mt-8">
              <Service
                icon={<RiArrowGoBackLine />}
                title="SHIPPING AND RETURNS"
                description="Enjoy free shipping on all orders and free returns within 14 days from delivery."
                link="https://www.fendi.com/tr/info/customer-care/faq"
                linkText="Read our shopping FAQs"
              />

              <Service
                icon={<RiBookOpenLine />}
                title="BOOK AN APPOINTMENT"
                description="Receive dedicated advice and shopping assistance from our boutique staff."
                link="https://www.fendi.com/tr/services-fendi"
                linkText="Find your nearest store"
              />

              <Service
                icon={<RiStore2Line />}
                title="IN-STORE PICK UP"
                description="The best of both worlds: shop online and pick up your order at your convenience in selected Fendi stores."
                link="https://www.fendi.com/tr/info/customer-care/premium-services"
                linkText="Discover more Premium Services"
              />

              <Service
                icon={<RiBookOpenLine />}
                title="SPECIAL PACKAGING"
                description="Your order will be elegantly wrapped in our signature Fendi package. Add a personal message to send an exclusive gift."
                link="https://www.fendi.com/tr/info/customer-care/shipping-and-delivery"
                linkText="Sending a Gift"
              />
            </div>
          </div>
        </div>

        {/* <pre className="bg-gray-100 text-11/16 p-2">{JSON.stringify(product, null, 2)}</pre> */}
      </>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const fetchProduct = await fetch(`${process.env.API_HOST}/products/${params.id}`)
  let product = await fetchProduct.json()

  return {
    props: {
      product
    }
  }
}

export default PageProduct
