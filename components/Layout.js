import React from 'react';
import Head from 'next/head';

const Layout = ({ pageTitle, children }) => (
  <div>
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="facebook-domain-verification"
        content="zqzl2e8e5d36a5deejlx4414qaenkl"
      />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/images/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/images/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/images/favicons/favicon-16x16.png"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,500i,600,700,800%7CSatisfy&display=swap"
        rel="stylesheet"
      />
      <link
        href="http://fonts.cdnfonts.com/css/sf-pro-display"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="/assets/plugins/bootstrap/bootstrap.min.css"
      />
      <link rel="stylesheet" href="/assets/css/animate.min.css" />
      <link
        rel="stylesheet"
        href="/assets/plugins/fontawesome-free-5.11.2-web/css/all.min.css"
      />
      <link rel="stylesheet" href="/assets/plugins/kipso-icons/style.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
      <link rel="stylesheet" href="/assets/css/responsive.css" />
    </Head>
    <div className="page-wrapper">{children}</div>
    <script src="/assets/plugins/bootstrap/jquery.min.js" />
    <script src="/assets/plugins/bootstrap/bootstrap.min.js" />
  </div>
);

export default Layout;
