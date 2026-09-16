const express = require("express");
const app = express();
const port = 8080;

function meuMiddleware(req, res, next) {
  console.log("passei pelo midleuare");
  next();
}

app.use(meuMiddleware);

app.get("/", (req, res) => {
  res.send("Eae bribioteka");
});

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});
