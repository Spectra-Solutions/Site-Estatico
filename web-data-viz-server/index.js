const express = require('express');
const conexao = require('./bd/connection');
const routesUser = require('./routes/usuarioRoute');
const routesPages = require('./routes/pagesRoutes');
const routesDash = require('./routes/dashboardRoutes');
const routesProcessos = require("./routes/processosRoutes");
const routesSlack = require("./routes/slackRoutes");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// sessão de login
const session = require('express-session');
app.use(session({
    secret: 'chave',
    resave: false,
    saveUninitialized: true

}));


app.use(express.static('public')); // static para arquivos como css e img
app.use(cors());

const fs = require('fs');
const path = require('path');

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'Instalador-spectra-sqlServer.sh');

    // Configura os cabeçalhos para a resposta
    res.setHeader('Content-Type', 'application/x-sh');
    res.setHeader('Content-Disposition', 'attachment; filename=Instalador-spectra-sqlServer.sh');
    
    console.log('Enviando arquivo:', filePath);

    // Cria uma leitura de fluxo do arquivo e a canaliza para a resposta
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

const router = express.Router(); // rotas 

const port = 80;

conexao.connect(erro => {
    if (erro) {
        console.log(erro.message)
    } else {

        console.log('Banco conectado');

        routesUser(app); // usuario
        routesPages(app);
        routesDash(app);
        routesProcessos(app);
        routesSlack(app);

        app.listen(port, () => {
            console.log(`Servidor conectado na porta ${port}`);
        });

        // rotas
        app.get('/', (req, res) => {
            res.status(200).json({ "message": "Express rodando" })
        });

        // GET: envia os dados pela url
        // POST: não envia os dados pela url, envia de forma diferente

    }
})
