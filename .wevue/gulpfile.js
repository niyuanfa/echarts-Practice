require("babel-register")
let gulp = require('gulp')
var gutil = require('gulp-util')
let exec = require('child_process').exec
gulp.task('start', function () {
    gutil.log(" gulp start ")
    let webpackTask = exec('npm run dev')
    webpackTask.stdout.on('data', function (data) {
        gutil.log(data)
    })
    webpackTask.stderr.on('data', function (data) {
        gutil.log(data)
    })
    webpackTask.on('error', function (err) {
        gutil.log(err)
    })
    webpackTask.on('exit', function (code) {
        gutil.log('wevue进程关闭')
    })
})
var paths = {
    rootConfig: ['src/app.json']
}
gulp.task('watch', function () {
    gulp.watch(paths.rootConfig, ['set-'])
})
gulp.task('default',['start','watch'])