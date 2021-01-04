import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
    pug:{
        src: "src/*.pug",
        dest: "build"
    }
};

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del("build/");

const webserver = () => gulp.src("build").pipe(ws({ port: 8000,livereload: true, open: true}));

const prepare = async () => await gulp.series([clean]);
const assets = async () => await gulp.series([pug]);
const postDev = async () => await gulp.series([webserver]);

export const dev = gulp.series([prepare, assets, postDev]);