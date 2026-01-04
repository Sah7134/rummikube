const path = require('path');

module.exports = {
  root: path.resolve(__dirname, 'packages/frontend'),
  build: {
    outDir: path.resolve(__dirname, 'dist')
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
};
