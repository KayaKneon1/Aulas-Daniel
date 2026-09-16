const express = require('express');
const path = require('path');
const app = express();
// const methodOverride = require('method-override');
const port = 3001;
//const path = require('path');

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
let usuarios =[
  {
    "id": 1,
    "nome": "Clara Araújo"
  },
  {
    "id": 2,
    "nome": "Lyvia Niedja"},
  {
    "id": 23,
    "nome": "Daniel prof"
  }
];
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});
app.post('/usuarios', (req, res) => {
  const novoUser = req.body;
  usuarios.push(novoUser);
  res.json(usuarios);
});
app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  usuario.nome = req.body.nome;
  res.json(usuario);
});
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter((u) => u.id !== id);
  res.json(usuarios);
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