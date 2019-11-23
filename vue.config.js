module.exports = {
  publicPath: "./",
  lintOnSave: true,
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Tableau Tab | AppsForTableau",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
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
