// const http = require('http');
// const server = http.createServer((req, res) =>{
//     console.log('run request...');
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h3>Hello world!</h3>');
//     res.write('<h2>From NodeJs</h2>');
//     res.end();
// })
// server.listen(3000, 'localhost', ()=>{
//     console.log('NodeJs server is running on port: 3000');
// })


// const express = require('express')
import express from 'express';
import configViewEngine from './configs/viewEngine';
import  initWebRoute from './route/User/web';
import  initWebRouteAdmin from './route/Admin/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';
require('dotenv').config();
var morgan = require('morgan')
const app = express()
const session = require('express-session');
const port = process.env.PORT || 8080;
// the method backup, if process.env.PORT is undefined, port will equals 8080

// configure session
app.use(session({
  secret: 'some secret',
  cookie: {maxAge: 9999999999},
  saveUninitialized: true,
  // if you set saveUniinitialize is false, when you close the browser, you will logout and must be login again
  resave: false
  // if you set resave is false, that means session will be stored in database when modifications is taken
}));

// app.use((req, res, next) =>{
//   console.log('>>>run into my middleware');
//   console.log(req.method)
//   next();
// })y


// app.use(morgan('combined'));y
//  The "combined" format includes detailed information about each HTTP request, 
// such as the IP address of the client, the timestamp, the HTTP method, the requested URL, 
// the HTTP status code, the size of the response, and more. This format is commonly used for access logs.
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//line 24,25 of the code will allow developers to easily get date from the client side

// set up viewEngine
configViewEngine(app);

// init web route
initWebRoute(app);

initWebRouteAdmin(app);

// init api
initAPIRoute(app);

// handle 404 not found
// app.use((req, res) => {
//   return res.render('404.ejs');
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})