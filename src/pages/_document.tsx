import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet"/>

          <title>Acervo Marvel</title>
          <link rel="shortcut icon" href="./logo.png" type="image/svg" />
        </Head>
        <body className="bg-slate-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
