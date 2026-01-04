export default {
  plugins: [require('@vitejs/plugin-react').default()],
  root: require('path').resolve(__dirname, 'packages/frontend'),
  build: {
    outDir: require('path').resolve(__dirname, 'packages/frontend/dist')
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
