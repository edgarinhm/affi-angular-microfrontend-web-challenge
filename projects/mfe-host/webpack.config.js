const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
require('dotenv').config();

console.log("Host Front.MFE_AUTH_URL = " + JSON.stringify(process.env.MFE_AUTH_URL));

// Dev ports for local development
const getDevPort = (appName) => {
  const ports = {
    'mfeHost': 4200,
    'mfeAuth': 4201,
  };
  return ports[appName] || 4200;
};

// Define remote URLs based on environment
const getLocalUrl = (appName) => {
  return `http://localhost:${getDevPort(appName)}/remoteEntry.js`
};

module.exports = withModuleFederationPlugin({

  name: 'mfe-host',

  remotes: {
    mfeAuth: process.env.MFE_AUTH_URL || `${getLocalUrl('mfeAuth')}`,
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings: ["@commons-lib"],

});
