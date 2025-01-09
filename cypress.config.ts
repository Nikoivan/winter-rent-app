const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    integrationFolder: 'e2e',
    pluginsFile: false,
    supportFile: false,
    video: false,
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
