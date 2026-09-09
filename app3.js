const express = require("express");
const caminho = require("path");
const app = express();
const porta = 3001;

app.use(express.urlencoded({ extended: true }));
app.user(express.json);

app.post("/boasVindas", (req, res) => {
  const nome = req.body.nome;
  res.send(`Eae ${nome} tua idade é ${idade} né?`);
});
app.port("/boasVindas2", (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  res.send(`Eae ${nome} tua idade é ${idade} né?`);
});


let usuarios = [
    {
        "id":1,
        "nome":"Kayque"
    },
    {
        "id":2,
        "nome":"Anderson"
    },
    {
        "id":3,
        "nome":"Michael"
    }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios)
});
app.post("/usuarios", (req, res) => {
  const novoUsuario = req.body
  usuario.push(novoUsuario)
  res.puch(usuario)
});
app.put("/usuarios/:id", (req, res)=>{
  const id = parseInt(req.params.id) 
  const usuario = usuario.find ((u) => u.id === id)
  usuario.nome = req.body.nome
  res.join(usuario)
})



app.listen(porta, () => {
  console.log(`servidor funcionando em: http://localhost:${porta}`);
});
