import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// import dbConnect from "../../../utils/dbConnect";

const options = {
  site: 'http://localhost:3000',

  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'user',
    }),
  ],

  callbacks: {
    redirect: async (url, baseUrl) => {

      // console.log(url, "BEFORE THE CHANGE");
      
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
    },
    session: async (session, token) => {
      // console.log(session, "<--- SESSION INFO")
      // console.log(token, "<--- TOKEN INFO");
      return Promise.resolve(token)
    },
    jwt: async (token, oAuthProfile) => {
      return Promise.resolve(token)
    }
  },

  session: {
    jwt: true
  }

  // A database is optional, but required to persist accounts in a database
  // database:

}

export default (req, res) => NextAuth(req, res, options)