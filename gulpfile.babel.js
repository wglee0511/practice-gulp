import gulp, { dest } from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import img from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import bro from "gulp-bro";
import babalify from "babelify";
import ghPages from "gulp-gh-pages";

const URL = "https://github.com/wglee0511/practice-gulp";

sass.compiler = require("node-sass");

const routes = {
    pug:{
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img:{
        src: "src/img/*",
        dest: "build/img"
    },
    scss:{
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build"
    },
    js:{
        watch: "src/js/**/*.js",
        src:"src/js/main.js",
        dest:"build"
    },
    gh:{
        src:"build/**/*"
    }

};

const pug = () =>  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
const clean = () => del(["build",".publish"]);
const webserver = () =>  gulp.src("build").pipe(ws({livereload: true,open: true}));
const image  = () => gulp.src(routes.img.src).pipe(img()).pipe(gulp.dest(routes.img.dest));
const style = () => gulp.src(routes.scss.src).pipe(sass().on("error", sass.logError)).pipe(autoprefixer({cascade:false})).pipe(csso()).pipe(gulp.dest(routes.scss.dest));
const script = () => gulp.src(routes.js.src).pipe(bro({transform: [
    babalify.configure({presets:["@babel/preset-env"]}),
    ["uglifyify", {global:true}]
]})).pipe(dest(routes.js.dest));
const gh = () => gulp.src(routes.gh.src).pipe(ghPages());

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, image);
    gulp.watch(routes.scss.watch, style);
    gulp.watch(routes.js.watch, script);
}



export const dev = gulp.series([clean, image, pug, style, script, webserver, watch]);
export const deploy = gulp.series([clean, image, pug, style, script, gh, clean]);
