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
  return `http://localhost:${getDevPort(appName)}`
};

const getRemoteUrl = (appName) => {
  const remoteUrls = {
    mfeAuth: process.env.MFE_AUTH_URL
  }
  return `${remoteUrls[appName] || getLocalUrl(appName)}/remoteEntry.js`;
}

module.exports = withModuleFederationPlugin({

  name: 'mfe-host',

  remotes: {
    mfeAuth: getRemoteUrl('mfeAuth'),
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings: ["@commons-lib"],

});
