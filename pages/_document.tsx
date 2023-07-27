import { Html, Head, Main, NextScript } from 'next/document';
const Document =() => {
    return(
    <Html>
    <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
            <link rel='preconnect' href='https://fonts.gstatic.com' ></link>
            <link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></link>
            <link rel='stylesheet' href='/assets/icons/css/launchpad-icons.css' /> 
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
            <link rel='preconnect' href='https://fonts.gstatic.com' ></link>
            <link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet'></link>
      <link rel='stylesheet' type='text/css' href='//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css'/>
      <link rel='stylesheet' type='text/css' href='//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css'/>
     </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
}

export default Document