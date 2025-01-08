const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:5173/winter-rent-crm',
    specPattern: 'cypress/e2e/**/*.e2e.ts'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.spec.ts'
  }
});
