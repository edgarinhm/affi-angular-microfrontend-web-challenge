const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe-auth',

  exposes: {
    './AuthLogin': './projects/mfe-auth/src/app/auth/components/login/login.component.ts',
    './AuthRegister': './projects/mfe-auth/src/app/auth/components/register/register.component.ts',
    './AuthModule': './projects/mfe-auth/src/app/auth/auth.module.ts',
    './AuthRoutes': './projects/mfe-auth/src/app/auth/auth.routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  sharedMappings: ["@commons-lib"],

});
