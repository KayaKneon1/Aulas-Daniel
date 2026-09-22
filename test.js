const express = require('express');
const path = require('path');
const app = express();
const prisma = require('./lib/prisma');
const { emit } = require('cluster');
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/boasVindas', (req, res) => {
  const nome = req.body.nome; 
  res.send(`Seja bem-vindo, ${nome}`);
});
app.post('/boasVindas2/:nome&:idade', (req, res) => {
  const nome = decodeURIComponent(req.params.nome);
  const ida = req.params.idade;
  res.send(`Seja bem-vindo, ${nome} você tem ${ida} anos`);
});

app.post('/boasVindas3/:nome', (req, res) => {
  let nome = req.params.nome;
  nome = decodeURIComponent(nome);
  res.send(`Seja bem-vindo, ${nome}`);
 });
 
app.get('/usuarios', async(req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany()
        res.json(usuarios);
    }catch(erro){
        console.log(erro);
        res.status(500).json({
            'erro': 'Erro ao buscar Usuarios'
        })
    }
});


app.post('/usuarios', async(req, res) => {
    try{
        const novoUser = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email
            }
        });
        res.json(novoUser);
    }catch(erro){
        console.log(erro);
        res.status(500).json({
            'erro': 'Erro ao cadastrar o Usuarios'
        })
    }
});
app.put("/usuarios/:id", async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const {nome, email} = req.body;
    const usuario = await prisma.usuarios.uptade({
        where:{
            id:id
        }, 
        data: {
            nome: nome,
            email: email
        }
    })
    res.json(usuario);
    }catch(erro){
        console.log(erro);
        res.status(500).json({
            'erro': 'Erro ao atualizar Usuarios'
        })
    }
});
app.delete("/usuarios/:id", async(req, res) => {
    try {
    const id = await prisma.usuarios.delete({
        where:{
            id: id
        }
    });
    res.json(usuarios);

    }catch(erro){
        console.log(erro);
        res.status(500).json({
            'erro': 'Erro ao deletar Usuarios'
        })
    }
});

// app.get('/calculo/:n1/:n2/:op', (req, res) => {
//     const {n1, n2} = req.params;
//     const op = req.params.op.toLowerCase();
//     if(op === 'soma') {
//         res.send(`O resultado da soma é: ${parseFloat(n1) + parseFloat(n2)}`);
//     }else if(op === 'subtracao') {
//         res.send(`O resultado da subtração é: ${n1 -n2}`);
//     } else if(op === 'multiplicacao') {
//         res.send(`O resultado da multiplicação é: ${parseFloat(n1) * parseFloat(n2)}`);
//     } else if(op === 'divisao') {
//         res.send(`O resultado da divisão é: ${parseFloat(n1) / parseFloat(n2)}`);
//     }else {
//         res.send('Operação inválida');
//     }
// }); 
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

});


app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});