import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  {
    name: 'global::upload-fallback',
    config: {
      fallbackFile: 'uploads/fallback.jpg',
    },
  },
  'strapi::favicon',
  'strapi::public',
];

export default config;
