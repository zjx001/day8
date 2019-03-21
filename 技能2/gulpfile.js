const gulp = require('gulp')
const server = require('gulp-webserver')
const url = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./data/data.json')


console.log(data)
gulp.task('server', () => {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            livereload: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return res.end()
                }
                let { pathname } = url.parse(req.url, true)
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    const file = fs.readFileSync(path.join(__dirname, 'src', pathname))
                    res.end(file)
                }
            }
        }))
})