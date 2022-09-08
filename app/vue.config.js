module.exports = {
  //   lintSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {"^/api" : ""},  不要路径重写
        secure: false,
      },
    },
  },
}
