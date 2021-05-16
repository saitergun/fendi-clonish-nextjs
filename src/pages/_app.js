import Router from 'next/router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import '../styles/tailwind.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

NProgress.configure({
  // showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </>
  )
}

export default MyApp
