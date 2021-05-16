import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useRef, useEffect } from 'react'
import { useClickAway } from 'react-use'

import {
  RiSearch2Line,
  RiUser6Line,
  RiHeart3Line,
  RiHandbagLine,
  RiCloseLine,
} from 'react-icons/ri'

import useCategories from '../hooks/useCategories'

import NestedCategoryList from './NestedCategoryList'
import SignIn from './Navbar_PopoverSignIn'
import Search from './Navbar_PopoverSearch'
import ShoppingBagDrawer from './Navbar_ShoppingBagDrawer'
import classNames from 'classnames'

const IconButton = ({ children, badge, onClick }) => {
  return (
    <button
      className="relative w-8 h-8 flex items-center justify-center text-18/16 text-gray-600"
      onClick={onClick}
    >
      {children}

      {badge && (
        <span className="absolute top-1 right-1 w-3 h-3 flex items-center justify-center leading-none text-9/16 font-semibold rounded-full bg-primary">{badge}</span>
      )}
    </button>
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

const Navbar = () => {
  const [showSignInPopover, setShowSignInPopover] = useState(false)
  const [showSearchPopover, setShowSearchPopover] = useState(false)
  const [showBagDrawer, setShowBagDrawer] = useState(false)

  const [hideMegaMenu, setHideMegaMenu] = useState(false)

  const router = useRouter()

  const headerRef = useRef()

  const nestedCategories = useCategories({ nested: true })

  useClickAway(headerRef, () => {
    setShowSignInPopover(false)
    setShowSearchPopover(false)
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setShowSignInPopover(false)
      setShowSearchPopover(false)
      setShowBagDrawer(false)

      setHideMegaMenu(true)

      setTimeout(() => {
        setHideMegaMenu(false)
      }, 1)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  const handleClickSearch = () => {
    setShowSignInPopover(false)
    setShowSearchPopover(true)
  }

  const handleClickUser = () => {
    setShowSearchPopover(false)
    setShowSignInPopover(true)
  }

  const handleClickHeart = () => {
    router.push('/wishlist')
  }

  const handleClickBag = () => {
    setShowBagDrawer(true)
  }

  return (
    <>
      <header
        className="sticky top-0 h-65px container bg-white border-t-5 border-primary mx-auto z-10"
        ref={headerRef}
      >

        {!showSignInPopover && (
          <div className="w-full h-full flex items-center justify-between border-b px-4">
            <Link href="/">
              <a className="z-1">
                <img src="/logo-lite.png" width={99} height={30} />
              </a>
            </Link>

            <nav className={classNames('navbar-mega-menu', { 'no-dropdown': hideMegaMenu })}>
              <NestedCategoryList nestedCategories={nestedCategories} />
            </nav>

            <div className="flex items-center justify-end gap-1 z-1">
              <IconButton onClick={handleClickSearch}><RiSearch2Line /></IconButton>
              <IconButton onClick={handleClickUser}><RiUser6Line /></IconButton>

              <IconButton badge="14" onClick={handleClickHeart}><RiHeart3Line /></IconButton>
              <IconButton badge="3" onClick={handleClickBag}><RiHandbagLine /></IconButton>
            </div>
          </div>
        )}

        {showSignInPopover && (
          <div className="w-full h-full flex items-center justify-end border-b px-4">
            <CloseButton onClick={() => setShowSignInPopover(false)} />
          </div>
        )}

        {showSignInPopover && (
          <div className="absolute left-0 top-full w-full bg-white border-b">
            <SignIn
              onClickSignUpButton={(e) => {
                e.preventDefault()

                setShowSignInPopover(false)
                router.push('/auth/sign-up')
              }}
            />
          </div>
        )}

        {showSearchPopover && (
          <div className="absolute left-0 top-full w-full bg-white border-b -mt-px">
            <Search
              onClickCloseButton={() => setShowSearchPopover(false)}
            />
          </div>
        )}

      </header>

      {showBagDrawer && (
        <ShoppingBagDrawer onClose={() => setShowBagDrawer(false)} />
      )}
    </>
  )
}

export default Navbar
