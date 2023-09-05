const PROXY_CONFIG = {
  '/v1/*': {
    target: process.env['NG_APP_AVANTIO_API_HOST'],
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
