require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const controller = require('./controller')

const app = express();
app.use(bodyParser.json())

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//endpoints
app.get('/api/info', controller.getInfo)
app.post('/api/addHours', controller.addHours)
app.post('/api/previous', controller.getPrevious)

const port = SERVER_PORT || 3076
app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})