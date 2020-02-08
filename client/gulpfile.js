const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const exec = require('child_process').exec;
const consola = require('consola'); // make the console more pertty


gulp.task('default', (cb) => {
  consola.info('Look at how advanced you are now that you can follow my lesson');
  // running webpack
  exec('npm run build:dev', function (err, stdout, stderr){
    console.log(stdout)
    console.log(stderr)
    if (err) {
    consola.error('You have made and error in your Webpack Configuration or you have an error in something you imported in you webpack entry file')
  }
    cb(err);
  })
  consola.success('Your Scripts were bundled and injected into assets.js')

  nodemon({
    script: 'server.js',
    env: { 'NODE_ENV': 'development'}
  })
  consola.success('Sucessfully Booted up Your Server')
  browserSync.init({
    proxy :{
      target: 'http://localhost:8000',
      ws: true
    },
    serveStatic:['./assets']
  })
  gulp.watch([
    './src/**/*',
  './src/*'
], gulp.task('build')).on('change', (file) => {
    consola.success('Reloaded your browser with the changes your welcome')
    consola.info(`${file}`)
    return reload()
  })
  gulp.watch([
    './assets/**/*',
    './assets/*',
    './src/template/*'
]).on('change', (file) => {
  consola.success('Hey dude we reloaded the page but stop messing with the bundled files because your just going to end up overwriting it when you change the src files')
  consola.info(`${file}`)
  return reload()
})

  consola.success('Everything is awesome everything is cool when you code in a team.')
  cb();
});

gulp.task('build', cb=>{
  exec('npm run build:dev', function (err, stdout, stderr){
    console.log(stdout)
    console.log(stderr)
    if (err) {
    consola.error('You have made and error in your Webpack Configuration or you have an error in something you imported in you webpack entry file')
  }
    cb(err);
  })
  consola.success('Ran Gulp Build Successfully')
  cb();
} )
