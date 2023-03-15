const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://wc2023-server.azurewebsites.net/",
      changeOrigin: true,
    })
  );
};
