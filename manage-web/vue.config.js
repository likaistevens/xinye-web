module.exports = {
  outputDir: '../manage-api/public',
  devServer: {
    // mock server
    // proxy: 'http://localhost:36742',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '././' : './'
}
