const express = require('express');
const multer = require('multer');
const path = require('path');
const colaboradorGV = require("../controllers/dashboard");

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/assets'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage: storage, limits: {
        fileSize: 10 * 1024 * 1024, // 10MB em bytes
    }
});

module.exports = app => {

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());

    app.post("/cadastrarColaborador", upload.single('foto'), (req, res) => {

        const { nome, email, cpf, positivos, negativos, objetivo, userLogado, caracteristicas, plano } = req.body;

        var foto = "";

        if (req.file && req.file.filename) {

            foto = req.file.filename;
        }

        const parsedCaracteristicas = JSON.parse(caracteristicas);

        const dadosColaborador = {
            nome,
            email,
            cpf,
            positivos,
            negativos,
            objetivo,
            userLogado,
            plano,
            caracteristicas: parsedCaracteristicas,
            foto
        };

        colaboradorGV.cadastrarColaborador(dadosColaborador, res);
    });

    app.post("/atualizarColaborador", upload.single('foto'), (req, res) => {

        const { nome, email, cpf, positivos, negativos, objetivo, userLogado, caracteristicas, plano, idColab } = req.body;

        var foto = "";

        if (req.file && req.file.filename) {

            foto = req.file.filename;
        }

        const parsedCaracteristicas = JSON.parse(caracteristicas);

        const dadosColaborador = {
            nome,
            email,
            cpf,
            positivos,
            negativos,
            objetivo,
            userLogado,
            plano,
            caracteristicas: parsedCaracteristicas,
            foto, idColab
        };

        colaboradorGV.atualizarColaborador(dadosColaborador, res);
    });

    app.post("/apagarColaborador", (req, res) => {

        const { idColab } = req.body;

        colaboradorGV.apagarColab(idColab, res);
    });

    app.post("/listarColaboradores", (req, res) => {

        const idUsuario = req.body;
        colaboradorGV.listarColaboradores(idUsuario, res);
    });

    app.post("/pesquisarColaboradores", (req, res) => {

        const dados = req.body;
        colaboradorGV.pesquisarColaboradores(dados, res);
    });

    app.post("/listarColaboradoresSemanal", (req, res) => {

        const idUsuario = req.body;
        colaboradorGV.listarColaboradoresSemanal(idUsuario, res);
    });

    app.post("/colaboradorBusca", (req, res) => {

        const id = req.body;

        colaboradorGV.buscaPorId(id, res);
    });

    app.post("/avaliarColab", (req, res) => {

        const dados = req.body;

        colaboradorGV.avaliarColab(dados, res);
    });

    app.post("/contarColab", (req, res) => {

        const id = req.body;

        colaboradorGV.contarColab(id, res);
    });

    app.post("/contarLider", (req, res) => {

        const id = req.body;

        colaboradorGV.contarLider(id, res);
    });

    app.post("/desempenhoColab", (req, res) => {

        const id = req.body;

        console.log(id)

        colaboradorGV.desempenhoColab(id, res);
    });

    app.post("/calcularDesempenho", (req, res) => {

        const id = req.body;

        colaboradorGV.calcularDesempenho(id, res);
    });

}

