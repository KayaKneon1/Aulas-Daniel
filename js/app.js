const express = require('express')
const caminho = require('path')
const app = express()
const porta = 8000

app.get('/', (req, res) => {
    res.send('hello world1')
})

app.listen(porta, () => {
    console.log(`servidor rodando em https://localhost:${porta}`)
})