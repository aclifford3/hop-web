// `.env.json` is generated by the `npm run build` command
import {VERSION} from './version';

export const environment = {
  production: true,
  version: VERSION.version,
  serverUrl: 'https://api.hop-web.com/Prod/reservations',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ]
};
