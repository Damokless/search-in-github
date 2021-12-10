const express = require('express')
const app = express()
const existUser = require('./dbWorker')
const port = 4242

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user/:username', async function (req, res) {
    const data = await existUser(req.params.username)
    res.send(data)
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})