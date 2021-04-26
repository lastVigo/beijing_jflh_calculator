const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack =require('webpack')
const WebpackBar = require('webpackbar');
module.exports = {
  //   mode: 'development',
  target: "web", // 如果没有这个设置，恰巧有使用了browserslist设置（in package.json or in .borwserlistrc file），那么webpack devserver的自动刷新功能就失效了
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // externals: {
  //   echarts: "echarts",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new VueLoaderPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/
    ),
    new WebpackBar(),
  ],

  resolve: {
    alias: {
      vue: "@vue/runtime-dom",
      "@": path.join(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "cache-loader",
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],

              plugins: [
                [
                  "import",
                  {
                    libraryName: "ant-design-vue",
                    libraryDirectory: "es",
                    style: "css",
                  },
                ], // `style: true` 会加载 less 文件
              ],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        //noParse
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/.vue$/],
            },
          },
        ],
      },
    ],
  },
};