// express generator provided these
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// we added these
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var request = require('request');

// passport specific
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Connect to database
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/project3');
}

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
});

// require routes
var index = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express generator provided these
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
    // add path for angular ui.router here!

// passport requirements
app.use(session({
    secret: 'Jobs are cool',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);

// user validation
app.use(function (req, res, next) {
    global.currentUser = req.user;
    next();
});

// reference the routes we required above
app.use('/', index);
app.use('/users', users);
app.use('/profile', profile);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
