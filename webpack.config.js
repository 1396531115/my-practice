const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包HTML文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独打包CSS文件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS文件
const UglifyjsPlufin = require('uglifyjs-webpack-plugin'); // 压缩JS文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上次打包的文件
const SpeedMasureWebpackPlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMasureWebpackPlugin({
  outputFormat: 'human',
});

const HappyPack = require('happypack');
const os = require('os');
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devMod = process.env.NODE_ENV !== 'production';
const includePath = path.resolve(__dirname, 'src');

module.exports = smp.wrap({
  // 设置为开发模式
  mode: 'development',
  entry: './src/index.tsx',
  stats: 'errors-warnings',
  // 设置输出路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMod ? 'js/[name].js' : 'js/[name].[hash].js',
  },
  // dev-server设置
  devServer: {
    contentBase: './dist',
    compress: true,
    open: true,
    port: 9527,
  },
  // webpack查找的基础路径
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx|jsx|ts)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.(le|c)ss$/,
        include: [path.resolve(__dirname, 'node_modules'), includePath],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMod,
              publicPath: '../',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMod ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyjsPlufin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
      }),
      new OptimizeCssPlugin(),
    ],
  },
});
