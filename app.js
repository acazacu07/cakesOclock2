/**
 * Module dependencies.
 */

var express = require('express');// Express to run server and routes
var bodyParser = require('body-parser');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var methodOverride = require('method-override')

// Authentication Packages
var session = require('express-session');
var passport = require('passport');


//load customers route
var customers = require('./routes/customers');
//load products route
var products = require('./routes/products');
//load static_pages routes
var staticjsfile = require('./routes/static_pages');
//load cart route
var cartjsfile  = require('./routes/cart');
//load location route
var locationjsfile  = require('./routes/location');

//load register route
var registerjsfile = require('./routes/register_login');

//load user route
var profilejsfile = require('./routes/profile');

//load users route
var users = require('./routes/users');

//load item route
var itemjsfile = require('./routes/items');

//load adminorders route
var adminorders = require('./routes/adminorders');

//load checkout route 
var checkoutjsfile  = require('./routes/checkout');

//load adminproducts route 
var adminproducts  = require('./routes/adminproducts');

// Start up an instance of app
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));
// Set view engine to use, in this case 'ejs'
app.set('view engine', 'ejs'); //rendering data
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(
    connection(mysql,{

        host:"cakesdb1.cvnkqaqbljxc.us-east-1.rds.amazonaws.com",
        user: 'admin',
        password : 'Ireland1',
        port : 3306,
        database : "cakesOclockSch", //schemaName

    },'pool')
);

//session
app.use(session({
  secret:'C4k3s0cl0ck',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60 * 1000 * 30
  }
}));


//passport - Authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next()
});

app.get('/', routes.index);
//get register url
app.get('/register', registerjsfile.register);
app.post('/register_data', registerjsfile.register_data);

//get login url
app.get('/login', registerjsfile.login);
app.post('/login_data',registerjsfile.login_data);

//get logout url
app.get('/logout', registerjsfile.loggout);

//get profile url
app.get('/profile', profilejsfile.profile);
app.get('/users/edit/:id',profilejsfile.edit);

//get users url
app.get('/users', users.list);
//app.get('/users/add', users.add);
//app.post('/users/add', users.save);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id',users.save_edit);
app.get('/users/delete/:id', users.delete_user);



//get about_us url
app.get('/about_us', staticjsfile.about);
//get contact_us url
app.get('/contact_us', staticjsfile.contact);
//get faq url
app.get('/faq', staticjsfile.faq);
//get cookie policy url
app.get('/cookie_policy', staticjsfile.cpolicy);

app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
//get prd and item
app.get('/products', products.list);
app.get('/items/:id', itemjsfile.items);
//get cart url
app.get('/cart', cartjsfile.cart);
app.post('/cart', cartjsfile.cart_items);
app.get('/location', locationjsfile.location);
app.get ('/checkout', checkoutjsfile.checkout);

//get adminproducts url
app.get('/adminproducts', adminproducts.list);
app.get('/adminproducts/add', adminproducts.add);
app.post('/adminproducts/add', adminproducts.save);
app.get('/adminproducts/edit/:id', adminproducts.edit);
app.post('/adminproducts/edit/:id',adminproducts.save_edit);
app.get('/adminproducts/delete/:id', adminproducts.delete_product);

//get adminorders url
app.get('/adminorders', adminorders.list);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Errors => page not found 404
app.use((req, res, next) =>  {
  var err = new Error('Page not found');
  err.status = 404;
  next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;