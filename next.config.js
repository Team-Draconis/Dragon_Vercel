const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
module.exports = withCss(
  withSass({
    env: {
      MONGO_URI:
        "mongodb+srv://dragon:cc12finalproject@cluster0-dxrge.mongodb.net/test?retryWrites=true&w=majority",
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
