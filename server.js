const app = require('express')();
let customerData = require('./data').customerData;
const customersApi = require('./customers');
//parse contents of req.body
const bodyParser = require('body-parser');
//basic auth
const basicAuthConnect = require('basic-auth-connect');
//send a dummy cookie
const cookieParser = require('cookie-parser');
//send a session id via cookie
const cookieSession = require('cookie-session');

const Logger = (req,res,next) => {
    console.log('Request is ',req.url);
    next();
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(Logger);
app.use(basicAuthConnect((user,pass) => {
    return user==='ayan' && pass==='dalal';
}));
app.use(cookieParser());
app.use(cookieSession({
    'secret':'AYANDALAL'
}));

app.get('/', (req,res) => {
    console.log(req.cookies);
    if(!req.cookies.hasVisited){
        res.cookie('hasVisited','1',
                    {
                        maxAge: 60*60*1000,
                        httpOnly: true,
                        path: '/'
                    });
    }
    res.json({
        'name':'ayan',
        'age':22
    });
});

app.get('/library', function(req, res) {
  console.log(req.cookies);
  if(req.session.restricted) {
    res.send('You have been in the restricted section ' + 
             req.session.restrictedCount + ' times.');
  }else {
    res.send('Welcome to the library.');
  }
});

app.get('/restricted', function(req, res) {
  req.session.restricted = true;
  if(!req.session.restrictedCount){
    req.session.restrictedCount = 1;
  } else {
    req.session.restrictedCount += 1;
  }
  res.redirect('/library');
});

app.get('/api/customers', (req,res) => {
    res.send(customersApi.getCustomers());
});

app.get('/api/customer/:id', (req,res) => {
    let cust = customersApi.getCustomerById(parseInt(req.params.id));
    res.json(cust);
});

app.post('/api/customer', (req,res) => {
    let custs = customersApi.saveCustomer(req.body.details);
    res.send(custs);
    res.end('data saved successfully!!');
});

app.put('/api/customer/:id', (req,res) => {
    let cust = customersApi.getCustomerById(parseInt(req.params.id));
    res.json(cust);
});

app.delete('/api/customer/:id', (req,res) => {
    let cust = customersApi.getCustomerById(parseInt(req.params.id));
    res.json(cust);
});

app.listen('3001', () => console.log('listening to 3001'));