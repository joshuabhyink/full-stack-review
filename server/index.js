require("dotenv").config();

// require dependencies
const express = require("express");
const massive = require("massive");
const session = require("express-session");

// import variables
const app = express()
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;
const auth = require('./controllers/userController')

// top level middleware
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// invoke massive to connect to db
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => {
    console.log(err)
})

// endpoints
// auth
app.post(`/auth/register`, auth.register)
app.post(`/auth/login`, auth.login)
app.post(`/auth/logout`, auth.logout)
app.get(`/auth/user`, auth.getUserSession)

//nodemon listening for changes in server
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})