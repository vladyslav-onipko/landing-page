import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import sync from 'browser-sync';
import { deleteAsync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import nunjucksRender from 'gulp-nunjucks-render';
import gulpSassCompiler from 'gulp-sass';
import sassCompiler from 'sass';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

import { srcFolder, distFolder, config } from './config.js';

const sass = gulpSassCompiler(sassCompiler);

sync.create();

const html = () => {
  return gulp
    .src(config.templates.src)
    .pipe(
      nunjucksRender({
        path: [`${srcFolder}/components/`, `${srcFolder}/views/`],
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(distFolder));
};

const images = () => {
  return gulp
    .src(config.images.src)
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true,
            },
            {
              name: 'cleanupIDs',
              active: true,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(config.images.dist));
};

const scripts = () => {
  return gulp
    .src(config.scripts.src)
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'core.bundle.js',
          },
          resolve: {
            extensions: ['.js'],
          },
          optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
          },
          mode: 'development',
        },
        webpack
      )
    )
    .pipe(gulp.dest(config.scripts.dist));
};

const styles = () => {
  return gulp
    .src(config.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('core.css'))
    .pipe(csso())
    .pipe(
      rename({
        extname: '.bundle.css',
      })
    )
    .pipe(gulp.dest(config.styles.dist));
};

// const fonts = () => {
//   return gulp.src(config.fonts.src).pipe(plumber()).pipe(newer(config.fonts.dist)).pipe(gulp.dest(config.fonts.dist));
// };

const clear = () => {
  return deleteAsync('dist');
};

const run = () => {
  sync.init({
    server: distFolder,
  });

  gulp
    .watch([config.templates.src, config.templates.components, config.components.views], gulp.series(html))
    .on('change', sync.reload);
  gulp
    .watch(
      [
        config.styles.src,
        config.styles.general,
        config.styles.components,
        config.styles.utils,
        config.components.styles,
      ],
      gulp.series(styles)
    )
    .on('change', sync.reload);
  gulp
    .watch([config.scripts.src, config.scripts.components, config.components.scripts], gulp.series(scripts))
    .on('change', sync.reload);
};

export const build = gulp.series(clear, html, styles, images, scripts);
export const start = gulp.series(clear, html, styles, images, scripts, run);
