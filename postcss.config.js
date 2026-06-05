// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,         // 1rem = 37.5px（设计稿 375px 基准）
      propList: ['*'],          // 所有属性都转换
      selectorBlackList: [],    // 不排除任何选择器
      minPixelValue: 1,         // 最小转换阈值
      mediaQuery: false,        // 不转换媒体查询中的 px
      exclude: [/node_modules/],
    },
  },
}
