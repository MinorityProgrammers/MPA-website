import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// const options = {
//   providers: [
//     Providers.GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Providers.LinkedIn({
//       clientId: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//     }),
//     Providers.Facebook({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     jwt: true,
//   },
//   events: {
//     signIn: (user) => {
//       console.log(`user: ${JSON.stringify(user)}`);
//     },
//   },
//   database: {
//     type: "sqlite",
//     database: ":memory:",
//     synchronize: true,
//   },
//   logger: {
//     error(code, ...message) {
//       log.error(code, message);
//     },
//     warn(code, ...message) {
//       log.warn(code, message);
//     },
//     debug(code, ...message) {
//       log.debug(code, message);
//     },
//   },
// };

// export default (req, res) => NextAuth(req, res, options);
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      state: false,
    }),
    Providers.LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  events: {
    signIn: (user) => {
      console.log(`user: ${JSON.stringify(user)}`);
    },
  },
  debug: true,
  pages: {
    error: "/auth", // Error code passed in query string as ?error=
  },
  callbacks: {
    async session(session, user) {
      return session;
    },
  },
});
