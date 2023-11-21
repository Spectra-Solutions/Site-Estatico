const express = require('express');
const conexao = require('./bd/connection');
const routesUser = require('./routes/usuarioRoute');
const routesPages = require('./routes/pagesRoutes');
const routesDash = require('./routes/dashboardRoutes');
const routesProcessos = require("./routes/processosRoutes");
const bodyParser = require('body-parser');

const app = express();

// sessão de login
const session = require('express-session');
app.use(session({
    secret: 'chave',
    resave: false,
    saveUninitialized: true

}));


app.use(express.static('public')); // static para arquivos como css e img

const router = express.Router(); // rotas 

const port = 3000;

conexao.connect(erro => {
    if (erro) {
        console.log(erro.message)
    } else {

        console.log('Banco conectado');

        routesUser(app); // usuario
        routesPages(app);
        routesDash(app);
        routesProcessos(app);

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
