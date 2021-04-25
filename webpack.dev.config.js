const path = require('path');
const  webpack  = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.config');
module.exports = merge(base, {
  mode: "development",
  output: {
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  devServer: {
    port: 8000,
    open: true,
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
});
