export const environment = {
  production: false,
  microFrontendUrls: {
    mfeHost: process.env['MFE_HOST_URL'] ?? 'http://localhost:4200',
    mfeAuth: process.env['MFE_AUTH_URL'] ?? 'http://localhost:4201',
  },
};
