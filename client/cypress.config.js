const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'nr4e1m',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
