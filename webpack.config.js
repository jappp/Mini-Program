const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const srcdir = path.resolve(__dirname, "src");
const putdir = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    app: "./app.js",
    "pages/cart/cart": "./pages/cart/cart.js",
    "pages/detail/detail": "./pages/detail/detail.js",
    "pages/index/index": "./pages/index/index.js",
    "pages/order/order": "./pages/order/order.js",
    "pages/submit/submit": "./pages/submit/submit.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(putdir, "miniprogram"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(srcdir, "cloudfunctions"),

          to: path.resolve(putdir, "cloudfunctions"),
        },
        {
          from: path.resolve(srcdir, "miniprogram"),

          to: path.resolve(putdir, "miniprogram"),

          globOptions: {
            ignore: ["**/*.js"],
          },
        },
      ],
    }),
  ],
};
