const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const tailwindCss = require('tailwindcss');

module.exports = withCSS(
  withSass({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [tailwindCss('./tailwind.config.js')],
            },
          },
          { loader: 'sass-loader' },
        ],
      });

      return config;
    },
  }),
);

// removed export

async function getStaticProps(context) {
  const res = await fetch('https://.../data');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

module.exports = {
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    MINTER_ADDRESS: process.env.MINTER_ADDRESS,
    REACT_APP_MORALIS_APPLICATION_ID: process.env.REACT_APP_MORALIS_APPLICATION_ID,
    REACT_APP_MORALIS_SERVER_URL: process.env.REACT_APP_MORALIS_SERVER_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    BASE_URI: process.env.BASE_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NETWORK_URL: process.env.NETWORK_URL,
    ADDRESS: process.env.ADDRESS,
    NEXT_PUBLIC_NETWORK_ID_TESTNET: process.env.NEXT_PUBLIC_NETWORK_ID_TESTNET,
    NEXT_PUBLIC_NETWORK_ID_MAINNET: process.env.NEXT_PUBLIC_NETWORK_ID_MAINNET,
    NEXT_CASPER_API_URL: process.env.NEXT_CASPER_API_URL,
    CASPER_URL: process.env.CASPER_URL,
  },
};
