const express = require('express');
const conexao = require('./bd/connection');
const routes = require('./routes/usuarioRoute');
const routesPages = require('./routes/pagesRoutes');
const routesColab = require('./routes/dashboardRoutes');
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

        routes(app); // usuario
        routesPages(app);
        routesColab(app);

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
