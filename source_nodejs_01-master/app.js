var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
var locateVi = require('dayjs/locale/vi');
dayjs.extend(relativeTime)
dayjs.locale(locateVi)
const validator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash-notification');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const pathConfig = require('./path');

// Define Path
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';
global.__path_models     = __path_app + pathConfig.folder_models + '/';
global.__path_helpers   = __path_app + pathConfig.folder_helpers + '/';
global.__path_routers   = __path_app + pathConfig.folder_routers + '/';
global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_validates = __path_app + pathConfig.folder_validates + '/';
global.__path_views     = __path_app + pathConfig.folder_views + '/';
global.__path_view_admin     = __path_views + pathConfig.folder_module_admin + '/';
global.__path_view_blog      = __path_views + pathConfig.folder_module_blog + '/';
global.__path_public      = __base + pathConfig.folder_public + '/';
global.__path_uploads     = __path_public + pathConfig.folder_uploads + '/';
global.__path_middleware= __path_app + pathConfig.folder_middleware + '/';
const systemConfig = require(__path_configs + 'system');
const databaseConfig = require(__path_configs + 'database');


mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.9o21bec.mongodb.net/${databaseConfig.database}`);


var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'abcnhds',
  resave: false,
  saveUninitialized: true}
));
require(__path_configs + 'passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash(app, {
   viewName: __path_view_admin + 'elements/notify',
 }));
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// app.set('layout', __path_views + 'backend');
app.set('layout', __path_view_admin + 'admin');
// app.set('layout', __path_view_blog + 'frontend');
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Local variable
app.locals.systemConfig = systemConfig;
app.locals.dayjs = dayjs;
// Setup router
app.use(`/${systemConfig.prefixAdmin}`, require(__path_routers + 'backend/index'));
app.use('/', require(__path_routers + 'frontend/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render(__path_view_admin +  'pages/error', { pageTitle   : 'Page Not Found ' });
    // res.render(__path_view_blog +  'pages/error', { pageTitle   : 'Page Not Found ' });

});

module.exports = app;

