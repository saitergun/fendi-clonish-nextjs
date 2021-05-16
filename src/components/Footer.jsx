import Link from 'next/link'

import { useState } from 'react'
import classNames from 'classnames'

import {
  RiArrowUpSLine,
  RiArrowDownSLine,
} from 'react-icons/ri'

const Footer = () => {
  const [showLinks, setShowLinks] = useState(false)

  return (
    <div className="container mx-auto">

      <div className="grid grid-cols-12 items-start bg-gray-100 gap-8 p-8">

        <div className="col-span-5">
          <h3 className="text-11/16 font-semibold tracking-wider">SUBSCRIBE TO OUR NEWSLETTER</h3>

          <div className="mt-4">
            <input
              className="w-full h-10 font-bold text-11/16 tracking-wider bg-transparent placeholder-black border-b border-black"
              placeholder="Enter your e-mail address"
            />
          </div>
        </div>

        <div className="col-span-7 flex items-center justify-end tracking-wider gap-6">
          <div className="">
            <Link href="/">
              <a>Store Locator</a>
            </Link>
          </div>

          <div><span className="block w-px h-4 bg-primary" /></div>

          <div className="">
            <Link href="/">
              <a className="flex items-center justify-center gap-2">Shipping to: Turkey <RiArrowDownSLine /></a>
            </Link>
          </div>

          <div><span className="block w-px h-4 bg-primary" /></div>

          <div className="">
            <Link href="/">
              <a>English</a>
            </Link>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-4 border-b p-8">

        <div>
          <h3
            className="flex items-center justify-start font-bold tracking-widest cursor-pointer gap-4"
            onClick={() => setShowLinks((prev) => !prev)}
          >CUSTOMER CARE {showLinks ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h3>

          <ul
            className={classNames('tracking-wider space-y-3 mt-2', {
              'hidden': !showLinks,
              'block': showLinks,
            })}
          >
            <li><Link href="/"><a className="hover:underline">Contact us</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Book an appointment in boutique</a></Link></li>
            <li><Link href="/"><a className="hover:underline">FAQs</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Order and Shipping</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Return and Refunds</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Track your Order</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Return Form</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Fendi Blockchain</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Fendi Services</a></Link></li>
          </ul>
        </div>

        <div>
          <h3
            className="flex items-center justify-start font-bold tracking-widest cursor-pointer gap-4"
            onClick={() => setShowLinks((prev) => !prev)}
          >CORPORATE {showLinks ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h3>

          <ul
            className={classNames('tracking-wider space-y-3 mt-2', {
              'hidden': !showLinks,
              'block': showLinks,
            })}
          >
            <li><Link href="/"><a className="hover:underline">Store Locator</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Careers</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Sustsinability</a></Link></li>
          </ul>
        </div>

        <div>
          <h3
            className="flex items-center justify-start font-bold tracking-widest cursor-pointer gap-4"
            onClick={() => setShowLinks((prev) => !prev)}
          >INSIDE FENDI {showLinks ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h3>

          <ul
            className={classNames('tracking-wider space-y-3 mt-2', {
              'hidden': !showLinks,
              'block': showLinks,
            })}
          >
            <li><Link href="/"><a className="hover:underline">About Fendi</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Made to order</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Fur Atellier</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Case</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Fendi Boutique Hotel</a></Link></li>
          </ul>
        </div>

        <div>
          <h3
            className="flex items-center justify-start font-bold tracking-widest cursor-pointer gap-4"
            onClick={() => setShowLinks((prev) => !prev)}
          >LEGAL & PRIVACY {showLinks ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h3>

          <ul
            className={classNames('tracking-wider space-y-3 mt-2', {
              'hidden': !showLinks,
              'block': showLinks,
            })}
          >
            <li><Link href="/"><a className="hover:underline">Privacy Policies</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Cookie Policy</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Responsible Disclosure</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Terms and Conditions of Sale</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Website Terms of Use</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Code of Conduct</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Supplier's Code of Conduct</a></Link></li>
            <li><Link href="/"><a className="hover:underline">Company Information</a></Link></li>
          </ul>
        </div>

      </div>

      <div className="py-4 px-8">
        <p className="tracking-wider">© FENDI - ALL RIGHTS RESERVED - P. IVA 00900421009 LICENZA SIAE N. 3566/I/1417 - V. 9.23.7.AS3</p>
      </div>
    </div>
  )
}

export default Footer
