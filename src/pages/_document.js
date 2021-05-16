import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}

          {/* <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap" rel="stylesheet" /> */}
        </Head>

        <body
          style={{
            // fontFamily: '"Kumbh Sans", sans-serif'
          }}
        >
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
