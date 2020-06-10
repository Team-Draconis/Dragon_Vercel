const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
module.exports = withCss(
  withSass({
    env: {
      MONGO_URI:
        "mongodb+srv://dragon:cc12finalproject@cluster0-dxrge.mongodb.net/test?retryWrites=true&w=majority",
      // REACT_APP_FIREBASE_KEY: "AIzaSyCPP0z-dggN5bua1xYZxZB2ePqrGs-zerk",
      // REACT_APP_FIREBASE_DOMAIN: "fir-react-auth-54992.firebaseapp.com",
      // REACT_APP_FIREBASE_DATABSE: "https://fir-react-auth-54992.firebaseio.com",
      // REACT_APP_FIREBASE_PROJECT_ID: "fir-react-auth-54992",
      // REACT_APP_FIREBASE_STORAGE_BUCKET: "fir-react-auth-54992.appspot.com",
      // REACT_APP_FIREBASE_SENDER_ID: 765098794333,
    },
    SECRET_TOKEN: "dragon",
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]",
          },
        },
      });
      return config;
    },
  })
);
