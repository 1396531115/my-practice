const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包HTML文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 单独打包CSS文件
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩CSS文件
const UglifyjsPlufin = require("uglifyjs-webpack-plugin"); // 压缩JS文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除上次打包的文件

const devMod = process.env.NODE_ENV !== 'production';


module.exports = {
  // 设置为开发模式
  mode: "development",
  entry: "./src/index.tsx", 
  // 设置输出路径
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].js"
  },
  // dev-server设置
  devServer: {
    contentBase: './dist',
    compress: true,
    open: true,
    port: 9527
  },
  // webpack查找的基础路径
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.jsx'],
    mainFiles: ["index"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMod,
              publicPath: '../',
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: 'images/[name].[ext]',
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMod ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMod ? '[id].css' : '[id].[hash].css',
    })
  ],
  optimization: {
    minimizer: [
      new UglifyjsPlufin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true
      }),
      new OptimizeCssPlugin()
    ]
  }
}