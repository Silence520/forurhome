var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var rename = require("gulp-rename");



gulp.task('app', function(){
	console.log('ok')
            gulp.src('app.js')
	        .pipe(babel({
	            presets: ['env']
	        }))
	        .pipe(rename(function (path) {
		    path.basename += "_o";
		    path.extname = ".js"
		}))
	        .pipe(gulp.dest('./'))
        }
);


gulp.task('es', function(){
            gulp.src('./**/*.es')
	        .pipe(babel({
	            presets: ['env']
	        }))
	        .pipe(gulp.dest('./'))
        }
);

gulp.task('default', function () {
        gulp.watch('./**/*.es',["es"]);
        gulp.watch('app.js',["app"]);
});