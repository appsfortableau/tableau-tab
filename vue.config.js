module.exports = {
  publicPath: "./",
  lintOnSave: true,
  devServer: {
    headers: {
      "X-Frame-Options": "sameorigin"
    }
  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  }
};
