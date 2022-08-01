const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", '/create', '/fetch', '/update', '/delete'],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};