// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dillon Michlena',
  tagline: 'Robotics Engineer',
  favicon: 'img/logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://dillonmichlena.com',

  customFields: {
    // Apps Script web app URL for the live RAIL panel (see scripts/rail-public-stats.gs).
    // Leave empty to hide the panel.
    railStatsUrl:
      'https://script.google.com/macros/s/AKfycbzLqg-r6xKwszOK58xF0K9nikVo76M3evpBI1nYOX8tIE5Z0DFjcgGHz1TqJ-34HY4e/exec',
  },
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub Pages deployment
  organizationName: 'dillp1',
  projectName: 'portfolio-site',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          routeBasePath: 'projects',
          sidebarPath: './sidebars.js',
        },
        // Blog is off until there are real posts. To turn it on, replace `false` with
        // {showReadingTime: true} and put posts in blog/.
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
      image: 'img/Headshot.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Dillon Michlena',
        logo: {
          alt: 'Dillon Michlena logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'projectsSidebar',
            position: 'left',
            label: 'Projects',
          },
          {
            href: 'pathname:///Dillon-Michlena-Resume.pdf',
            label: 'Resume',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Discover',
            items: [
              {
                label: 'About Me',
                to: '/#about',
              },
              {
                label: 'Projects',
                to: '/projects',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'Email me',
                href: 'mailto:dillon.michlena@gmail.com',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/dillon-michlena',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dillon Michlena`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
