这是一个初始化构建react应用的模板，并没有采用react脚手架
基于Webpack4 + TypeScript 构建, 优化了一些打包方式
采用html-webpack-plugin打包HTML文件
采用mini-css-extract-plugin打包css文件，启用了hmr，因为是异步编译方式，所以比extract-text-webopack-plugin更友好
采用opotimize-css-assets-webpack-plugin压缩css文件

下一步优化目标： 构建优化，拟采用DllPlugin；