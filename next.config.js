  const withPWA = require("next-pwa");

module.exports = withPWA({
    images: {
        domains: [ "cdn.discordapp.com" ]
    },
    i18n: {
        locales: Object.keys(require("./locales.config.js")),
        defaultLocale: 'en',
        localeDetection: true,
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV == "development"
    },
    async redirects() {
        return [
          {
            source: '/invite',
            destination: 'https://api.awardbot.me/v1/invite/bot',
            permanent: true,
          },
        ]
      },
});