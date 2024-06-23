const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const db = require('mysql');
const app = express();
const port = process.env.PORT || 443;



app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'www', 'public')));

const connection = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www', 'index.html'));
});

let logs = [];


const premios = [
  { premio: "Tattoo Grátis", peso: 1 }, 
  { premio: "Chaveiro", peso: 5 },      
  { premio: "Desconto 30%", peso: 10 }, 
  { premio: "Desconto 20%", peso: 15 }, 
  { premio: "Desconto 10%", peso: 20 }, 
  { premio: "Nada, infelizmente", peso: 49 } 
];


function escolherPremio() {
  let somaTotal = premios.reduce((acc, item) => acc + item.peso, 0);
  let r = Math.random() * somaTotal;
  let soma = 0;

  for (let i = 0; i < premios.length; i++) {
    soma += premios[i].peso;
    if (r <= soma) {
      return premios[i].premio;
    }
  }
}


app.post('/gerarPremio', (req, res) => {
  var nome = req.body.nome || "Usuário Anônimo";
  if (nome[0] !='@'){
    nome = `@${nome}`;
  }
  const premio = escolherPremio();
  const timestamp = new Date();
  const registro = { nome, premio, timestamp };

  const query = 'INSERT INTO logs (username, award, log_date) VALUES (?, ?, ?)';
  connection.query(query, [nome, premio, timestamp], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send('O prêmio já foi gerado para este usuário.');
      } else {
        console.error('Erro ao inserir log: ', err.stack);
        res.status(500).send('Erro no servidor');
      }
      return;
    }
    res.json(registro);
  });
});


const privateKey = fs.readFileSync('./certificado.pem', 'utf8');
const certificate = fs.readFileSync('./certificado.pem', 'utf8');
const ca = fs.readFileSync('./certificado.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

app.get('/logs', (req, res) => {
    connection.query('SELECT * FROM logs', (err, results) => {
        if (err) {
            res.status(500).send('Erro no servidor');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//http.createServer(credentials, app).listen(port, () => {
//  console.log(`Servidor rodando na porta ${port}`);
//});
