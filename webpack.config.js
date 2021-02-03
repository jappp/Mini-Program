const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const loadPath = require('./plugin/loadpath');
const srcdir = path.resolve(__dirname, "src");
const putdir = path.resolve(__dirname, "dist");

module.exports = {
  entry: (new loadPath).init({
    src: path.resolve(srcdir, 'miniprogram/app.js')
  }),
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
