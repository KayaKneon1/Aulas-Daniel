const express = require('express');
const path = require('path');
const prisma = require('./lib/prisma');

const app = express();

const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rota de teste 1
app.post('/boasVindas', (req, res) => {
    const nome = req.body.nome;

    res.send(`Seja bem-vindo, ${nome}`);
});


// Rota de teste 2
app.post('/boasVindas2/:nome&:idade', (req, res) => {
    const nome = decodeURIComponent(req.params.nome);
    const idade = req.params.idade;

    res.send(`Seja bem-vindo, ${nome} você tem ${idade} anos`);
});


// Rota de teste 3
app.post('/boasVindas3/:nome', (req, res) => {
    let nome = req.params.nome;

    nome = decodeURIComponent(nome);

    res.send(`Seja bem-vindo, ${nome}`);
});


// GET - Listar usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao buscar Usuários'
        });
    }
});


// POST - Adicionar usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body;
        const novoUser = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email
            }
        });

        res.json(novoUser);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao cadastrar Usuário'
        });
    }
});

// PUT - Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email } = req.body;

        const usuario = await prisma.usuario.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                email: email
            }
        });

        res.json(usuario);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao atualizar Usuário'
        });
    }
});


// DELETE - Excluir usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const usuario = await prisma.usuario.delete({
            where: {
                id: id
            }
        });

        res.json(usuario);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao excluir Usuário'
        });
    }
});


// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Servidor rodando: http://localhost:${port}`);
});