import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // allow Monaco assets from jsdelivr
          'script-src-elem': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
          // keep this to avoid forcing HTTPS upgrade in dev
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;