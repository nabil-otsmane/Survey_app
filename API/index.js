const express = require('express')
const cors = require('cors')
const Database = require('./lib/db')
const routes = require('./router')

const app = express()

app.use(cors())
app.use(express.json())

const db = new Database({ path: "../" });

app.use('/api', routes(db))

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("server is running at 127.0.0.1:" + port)
})