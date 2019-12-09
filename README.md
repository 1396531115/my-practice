# 一、从零开始搭建一个React+Webpack4+TypeScript项目框架

## 1. 前言

在<span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">create-react-app</span>脚手架中提供了傻瓜式生成React项目的方式，但是其 `webpack` 配置项太过于复杂，不适合于大多数项目的需求，所以很多企业并不会使用它，而是从零开始一步一步搭建自己的项目结构。

所以本文主要描述的是从零开始搭建一个基础的项目框架，以及搭建过程中遇到的问题，希望对初学者有一些帮助。先看看项目的插件版本：

```json
{
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "typescript": "^3.7.2",
    "webpack": "^4.41.2",
}
```

下面，直接开始上手。

## 2. 构建与配置

下面是项目的目录结构（仅供参考）：

```javascript
my-app                  // 项目名称文件夹
|
|--public               // 公共资源文件夹，不需要通过Webpack打包的静态资源
|--src                  // 需要经过Webpack打包的资源文件夹
  |--api                // 请求数据的接口文件夹，存放一些调用接口API
  |--assets             // 存放图片、style的目录
    |--styles
    |--images
  |--components         // 自定义组件存放目录
  |--utils              // 公共方法存放目录
  |--index.tsx            // 项目入口文件
  |--app.tsx              // app组件入口文件
|--package.json  
|--gitignore
|--webpack.config.js
|--readme.md
|--tsconfig.json
|--tslint.json
```

- ### 安装 Node.js、Git并进行相关配置

  首先安装 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">Node.js</span> 并配置好node的全局安装目录、`npm` 仓库的请求地址、全局变量。本文就不再赘述，下面是具体配置方法

  [Node.js以及npm的环境配置(全面)](https://blog.csdn.net/qq_42352666/article/details/98218899)

  [Git使用指南（廖雪峰）](https://www.liaoxuefeng.com/wiki/896043488029600)

- ### 构建项目目录

  新建一个项目名称，本文命名为 `my-app` ，然后打开文件夹，进入命令行窗口，输入 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">npm init</span> 生成一个 `package.json` 文件

  ![image-20191207115921712](C:\Users\joie\AppData\Roaming\Typora\typora-user-images\image-20191207115921712.png)

  然后就是进一步细化你想构建的项目目录结构：

  1. 新建 `public` 文件夹用于存放公共资源文件；
  2. 新建 `src` 文件夹用于存放项目的相关页面组件、图片等；
  3. 在 `src` 中新建 `index.tsx` 文件作为React项目的入口文件；
  4. 新建 `webpack.config.js` 文件用于配置 `webpack` 打包与编译。

  最后，再来看看项目的目录结构

  ![image-20191207162547982](C:\Users\joie\AppData\Roaming\Typora\typora-user-images\image-20191207162547982.png)

- ### 安装配置 `Webpack`

  构建项目最关键的步骤就是配置 `Webpack` 了，一个优化好的编译方式能让我们更高效地在项目中开发相关的业务逻辑代码和组件，或者更为快捷地进行项目的部署与发布。而 `Webpack` 的构建与部署基本很大程度上依赖于我们对 `Webpack` 插件的选取（你也可以自己开发一些插件用于项目中，不要问为什么，大公司基本上都是这么搞的）。

  首先需要全局安装 `webpack`，`webpack-cli` ，这样我们就方便运行 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">webpack</span> 命令去编译打包了。

  ```javascript
  npm i -g webpack webpack-cli
  ```

  下面开始一步一步地构建我们想要的应用

  #### 第一步：修改 `webpack` 的输入输出方式

  我们需要引用第三方插件来更改JS、CSS、图片、字体等文件的输出方式，这里涉及到许多的细节操作：压缩、编码、优化...

  - **修改 `package.json` 中的入口文件为 `index.tsx` (通过 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">npm init</span> 命令生成的 `package.json` 默认是index.js)；**

  - **编辑 `webpack.config.js` ，修改入口，路径与JS的输出目录**

    ```javascript
    // webpack.config.js
    const path = require('path');
    
    module.exports = {
      entry: './src/index.tsx',
      output: {
        path: path.resolve(__dirname, 'dist'), // 项目编译目录
        filename: 'js/[name].[hash].js'
      }
    }
    ```

    关于如何设置输出输出路径，请移步这里-->[webpack指南](https://www.webpackjs.com/concepts/)；

    在 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">filename</span> 前加的 `js/` 是为了将编译后的所有 `js` 单独存放在`js` 这个文件夹中(默认会自动创建文件夹)。`webpack` 分为开发模式 `DEV` 与发布模式  `PUB` ，我们甚至可以根据这些模式来生成不同名称的js文件，便于开发。

    ```js
    filename: process.env.NODE_ENV === 'development' ? [name].js : 'js/[name].[chunkhash].js'
    ```

    运行 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">webpack</span> 命令，我们就能看到生成了一个 `dist` 目录，里面有一个 `js`文件夹

    ![image-20191207162354198](C:\Users\joie\AppData\Roaming\Typora\typora-user-images\image-20191207162354198.png)

    

  #### 第二步：引入loader， 让webpack能够预处理其他静态资源

  `webpack` 默认能够预处理 `js` 文件资源，对于CSS/LESS/SASS、图片、字体等资源需要引入一些第三方 loader（也可以自己开发一些类似的loader）。

  - **引入 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">babel-loader</span> ，让 `webpack` 更友好地支持 `ES5 ~ ESnext`**

    官方中文指南：[babel-loader](https://babel.docschina.org/docs/en/)；

    webpack的Babel使用指南：[babel-loader|webpack](https://www.webpackjs.com/loaders/babel-loader/)；

    需要安装： <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">babel-loader</span> 、 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">@babel/core</span> 、 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">@babel/preset-env</span> ；

    如果使用了 `TypeScript` ，需要安装： <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">@babel/preset-typescript</span> 。当然，也可以使用`TypeScript` 官方推荐的 [ts-loader](https://www.npmjs.com/package/ts-loader) 来编译 `TypeScript`，不过需要再写一个 `rules`。

    如果采用了 `react`，需要安装： <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">@babel/preset-react</span> ；

    至于为什么使用 `Babel`，请参考 [TypeScript 和 Babel：一场美丽的结合](https://blog.csdn.net/mK0vouYv4BwgX190fSd/article/details/89325156)；

    ```js
    module: {
        rules: [
          // 如果使用的是ts-loader
          // {
          //   test: /\.(tsx|ts)$/,
          //   use: {
          //     loader: 'ts-loader'
          //   }
          // },
          {
            test: /\.(js|tsx|jsx|ts)$/, // 如果使用了ts-loader，删除jsx
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                // 如果使用了ts-loader，删除@babel/preset-typescript
                presets: ['@babel/preset-env', '@babel/preset-typescript',                                   '@babel/preset-react']
              }
            }
          }
        ]
      },
    ```

    然后就是ts的编译选项了，在 `my-app` 根目录新建 <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">tsconfig.json</span> 文件，下面贴出了一些常用的配置选项：

    ```json
    // tsconfig.json
    {
      "compilerOptions": {
        "target": "ES5",
        "allowJs": true, // 允许编译JS文件
        "allowSyntheticDefaultImports": true, // 允许导入没有export命令的模块
        "lib": [ // 编译时需要引入的库
          "dom",
          "dom.iterable",
          "esnext"
        ],
        "module": "esnext",  // 指定输出模块
        "moduleResolution": "node", // 输出模块处理方式
        "noEmit": true, // 不生成输出文件
        "jsx": "react", // 在.tsx文件里支持JSX
        "noUnusedLocals": true, // 不能出现未使用的局部变量
        "noUnusedParameters": true, // 不允许出现未使用的参数
        "resolveJsonModule": true,
        "isolatedModules": true,
    
      },
      "include": [
          "./src/**/*"
      ]
    }
    ```

    更详细的配置，请移步 [TypeScript-tsconfig.json官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)。

  - **引入 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">sass-loader</span> 、 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">less-loader</span> 或者 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">stylus-loader</span> ，让 `webpack` 更友好地支持 `SASS/LESS`**

    根据项目需求再采用合适的 `style-loader`  ，本项目采用的是 `sass`，具体的配置项如下：

    ```js
    {
      test: /\.(c|sc)ss$/,
       use: [
          “style-loader”,
          "css-loader",
          "sass-loader"
       ]
    },
    ```

    需要安装 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">sass-loader</span> 、<span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">css-loader</span> 、<span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">style-loader</span> 、<span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">node-sass</span> ;

    

  - asdf 

  #### 第三步：引入插件，优化编译部署

  - **引入第三方loaders或plugins，让webpack对资源文件更友好**

    所有插件和loader都只安装在dev依赖中。

    1. 安装 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">html-webpack-plugin</span> 插件，让生成的 `HTML` 能自动引入上述生成的 `js` 文件，然后在`webpack.config.js` 文件中进行配置:

       ```javascript
       // webpack.config.js
       const path = require('path');
       const HtmlWebpackPlugin = require('html-webpack-plugin');
       
       module.exports = {
         entry: './src/index.tsx',
         output: {
           path: path.resolve(__dirname, 'dist'), // 项目编译目录
           filename: 'js/[name].[hash].js'
         },
         plugins: [
           new HtmlWebpackPlugin({
             template: './public/index.html'
           })
         ]
       }
       ```

       需要注意的是要在 `public` 文件夹中新建 `index.html` 作为html文件的模板，具体配置请参考[HTMLWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)。

    2. 安装 <span style="color: #fff;background-color:pink;border-radius: 5px;padding: 2px 4px">mini-css-extract-plugin</span> ，将 `css` 样式单独打包生成独立 `css` 文件。

       ```js
       const MiniCssExtractPlugin = require('mini-css-extract-plutin');
       new MiniCssExtractPlugin({
             filename: devMod ? 'css/[name].css' : 'css/[name].[hash].css',
             chunkFilename: devMod ? '[id].css' : '[id].[hash].css',
           })
       ```

       

    3. 小法

  - 水电费

- 大师傅

------

错误日志：

1. 运行webpack提示`Cannot find module 'webpack/lib/node/NodeTemplatePlugin'`;

   ![image-20191207165738220](C:\Users\joie\AppData\Roaming\Typora\typora-user-images\image-20191207165738220.png)

   原因：本地没有安装 `webpack`，本地直接安装  <span style="color: #fff;background-color:black;border-radius: 5px;padding: 2px 4px">npm i -D webpack</span> 

2. ![image-20191207165734302](C:\Users\joie\AppData\Roaming\Typora\typora-user-images\image-20191207165734302.png)