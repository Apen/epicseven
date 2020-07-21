module.exports = {
  assetsDir: "assets",
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
};
