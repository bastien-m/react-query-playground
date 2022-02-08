const express = require("express");
const db = require("./db");
const app = express()

app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.url}`)
    console.dir(req.body)
    next()
})

app.post('/quantities/search', (req, res) => {
    const { page, size } = req.body
    console.log(`${page} ${size}`)
    const quantities = db.quantities.slice(page * +size, (+page + 1) * +size)
    res.json(quantities)
})


app.listen(3001, () => {
    console.log(`app listening on port 3001`)
})