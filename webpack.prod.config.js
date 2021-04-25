const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
module.exports = merge(base, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash:6].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 2000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        myself: {
          name: "chunk-myself",
          test: path.resolve("src"),
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new BundleAnalyzerPlugin(),
    new webpack.BannerPlugin("author lastvigo mailto:erwinz@163.com"),
    // new CompressionPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // {
      //   loader: "postcss-loader",
      // },
    ],
  },
});
