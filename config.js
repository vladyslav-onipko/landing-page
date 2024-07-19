const distFolder = './dist';
const srcFolder = './src';

const config = {
  components: {
    styles: `${srcFolder}/components/*/*.scss`,
    scripts: `${srcFolder}/components/*/*.js`,
    views: `${srcFolder}/components/*/*.njk`,
  },
  templates: {
    src: `${srcFolder}/views/pages/*.njk`,
    components: `${srcFolder}/views/core-components/*.njk`,
    dist: distFolder,
  },
  images: {
    src: `${srcFolder}/images/*`,
    dist: `${distFolder}/images/`,
  },
  styles: {
    src: `${srcFolder}/scss/core.scss`,
    general: `${srcFolder}/scss/general/*.scss`,
    components: `${srcFolder}/scss/core-components/*.scss`,
    utils: `${srcFolder}/scss/utils/*.scss`,
    dist: `${distFolder}/css/`,
  },
  scripts: {
    src: `${srcFolder}/js/*.js`,
    components: `${srcFolder}/js/core-components/*.js`,
    dist: `${distFolder}/js/`,
  },
  fonts: {
    src: `${srcFolder}/assets/fonts/*/*.woff2`,
    dist: `${distFolder}/fonts/`,
  },
};

export { srcFolder, distFolder, config };
