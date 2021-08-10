const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const concat = require("gulp-concat");
const del = require("del");
const webp = require("gulp-webp");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Html

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

//Script

const script = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(sourcemap.init())
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.script = script;

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"));
}

exports.copyImages = copyImages;

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/sprites/*.svg")
    .pipe(svgstore({
      inlineSVG: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("script"));
  gulp.watch("source/*.html").on('change', gulp.series("html", sync.reload));
}

exports.default = gulp.series(
  styles, server, watcher
);

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    html,
    script,
    sprite,
    createWebp
  )
)

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    script,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
)
