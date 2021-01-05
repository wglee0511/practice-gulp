import gulp, { dest } from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import img from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

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
        dest: "build/css"
    }

};

const pug = () =>  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
const clean = () => del("build");
const webserver = () =>  gulp.src("build").pipe(ws({livereload: true}));
const image  = () => gulp.src(routes.img.src).pipe(img()).pipe(gulp.dest(routes.img.dest));
const style = () => gulp.src(routes.scss.src).pipe(sass().on("error", sass.logError)).pipe(autoprefixer({cascade:false})).pipe(gulp.dest(routes.scss.dest));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, image);
    gulp.watch(routes.scss.watch, style);
}



export const dev = gulp.series([clean, image, pug, style, webserver, watch]);

