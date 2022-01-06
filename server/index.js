require('process')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const {encrypt, decrypt} = require("./Encrypter");

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'passwordmanager'
});

app.post('/add-password', (req, res) => {
    const {username, password, website} = req.body
    const encryptedUser = encrypt(username)
    const encryptedPassword = encrypt(password)
    db.query("INSERT INTO passwords (username, password, website, user_iv, password_iv) VALUES (?,?,?,?,?)", [
        encryptedUser.encryptedVal,
        encryptedPassword.encryptedVal,
        website,
        encryptedUser.iv,
        encryptedPassword.iv
    ], (result, err) => {
        if(err) {
            console.error(err);
        }else{
            res.status(201).json({message: "Account credentials added to database"});
        }
    });
});

app.get('/show-password', (req, res) => {
    db.query('SELECT * FROM passwords;', (err, result) => {
        if (err) {
            return console.error(err);
        }
        res.send(result);
    })
});

app.post('/decrypt-logins', (req, res) => {
    const user = decrypt(req.body.user)
    const password = decrypt(req.body.password)
    res.send({username: user, password: password});
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port "${process.env.SERVER_PORT}"`)
    console.log('Password manager online')
});