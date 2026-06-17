// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CaseDesk Docs',
  tagline: 'Deploy AI on your own infrastructure',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.getcasedesk.com',
  baseUrl: '/',

  organizationName: 'k0f1',
  projectName: 'casedesk-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/k0f1/casedesk-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'CaseDesk',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://getcasedesk.com',
            label: '← Back to app',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'CaseDesk',
            items: [
              {label: 'Back to app', href: 'https://getcasedesk.com'},
              {label: 'Privacy Policy', href: 'https://getcasedesk.com/privacy'},
              {label: 'Terms of Service', href: 'https://getcasedesk.com/terms'},
              {label: 'Contact', href: 'mailto:hello@getcasedesk.com'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CaseDesk.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'json'],
      },
    }),
};

export default config;
