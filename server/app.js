require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const api = axios.create({
    baseURL: `http://192.168.0.102/api/${ process.env.CREDENTIALS }`
})


app.get('/lights', (req, res) => {
    api.get('/lights').then(({ data }) => res.status(200).json(data))
})
app.post('/setLight', (req, res) => {
    api.put(`/lights/${req.body.id}/state`, { on: req.body.on })
    .then(({ data }) => res.status(200).json(data))
})

app.post('/setBrightness', (req, res) => {
    api.put(`/lights/${req.body.id}/state`, { bri: req.body.bri })
    .then(({ data }) => res.status(200).json(data))
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening port: ${ port }`))
