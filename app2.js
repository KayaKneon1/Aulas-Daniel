/* const path = require('path')
console.log(path.join(__dirname))
console.log(path.dirname(__filename))
console.log(path.parse(__filename))
console.log(path.extname(__filename))
console.log(path.join(__dirname,  'index.html', 'teste')) */

const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname, 'teste'), {}, err => {
    if (err) {
        console.error('Erro ao criar pasta: ', err)
    } else {
        console.log('pasta criada com sucesso')
    }

    return ;
})

fs.writeFile(path.join(__dirname, 'teste', 'teste.txt'), 'Hello World!', err => {
    if (err) {
        console.error('Erro ao criar arquivo: ', err)
    } else {
        console.log('arquivo criado com sucesso')
    }
})


fs.readFile(path.join(__dirname, 'teste', 'teste.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo arquivo: ', err)
    } else {
        console.log('arquivo lido: ', data)
    }
})