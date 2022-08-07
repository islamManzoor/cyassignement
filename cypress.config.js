const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'nn8rd6',
  viewportWidth: 1400,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
    },
    env: {
      googleRefreshToken: '1//04q0pku7sL2xCCgYIARAAGAQSNwF-L9IrASrYdu2owsldL_Mkmxc5861eEaGWi-SpPzC_-E3WrF5HF3BaE_3MfsbNDe7mzVPrOQs',
      googleClientId: '612303777718-d3rnmt3mu008g5usjgtapa1qhd3evs4i.apps.googleusercontent.com',
      googleClientSecret: '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',
    },
    experimentalSessionAndOrigin: true
  },
});




