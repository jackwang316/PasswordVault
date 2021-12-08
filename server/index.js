require('process')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mysql = require('mysql')


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'passwordmanager'
});

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port "${process.env.SERVER_PORT}"`)
    console.log('Password manager online')
});