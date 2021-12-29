require('process')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'passwordmanager'
});

app.post('/addpassword', (req, res) => {
    const {username, password, website} = req.body
    db.query("INSERT INTO passwords (username, password, website) VALUES (?,?,?)", [
        username,
        password,
        website,
    ], (result, err) => {
        if(err) {
            console.error(err);
        }else{
            res.send("Account credentials added to database");
        }
    });
});

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port "${process.env.SERVER_PORT}"`)
    console.log('Password manager online')
});