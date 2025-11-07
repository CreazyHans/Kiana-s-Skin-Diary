// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* --- GTM NO-SCRIPT DEBE IR AQUÍ (NO EN LAYOUT) --- */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N2GLWM2N"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
