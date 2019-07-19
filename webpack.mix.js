const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.scripts([
    'resources/js/project.js',
    'resources/js/additional-funcs.js',
    'resources/js/cart.js',
    'resources/js/info.js',
    'resources/js/menu.js',
    'resources/js/modal-user.js',
    'resources/js/modal-reg-log.js',
    'resources/js/onload-page.js'
], 'public/js/bundle.js');

mix.styles([
    'resources/css/css1.css',
], 'public/css/welcome.css');

mix.copyDirectory('resources/img', 'public/img');