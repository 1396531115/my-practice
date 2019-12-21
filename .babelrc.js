module.exports = {
  "presets": [
    ["@babel/preset-env", { "useBuiltIns": "usage" }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  // "presets": [
  //   [
  //     "@babel/polyfill",
  //     {
  //       "useBuiltIns": "usage",
  //       "corejs": 3
  //     }
  //   ],
  //   "@babel/preset-env",
  //   "@babel/react",
  //   "react-app"
  // ],

  "plugins": [
    [
      'import',
      { "libraryName": "antd", "style": "css" } // `style: true` 会加载 less 文件
    ],
  ],
}
