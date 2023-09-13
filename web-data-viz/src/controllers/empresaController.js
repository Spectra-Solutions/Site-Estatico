var empresaModel = require('../models/empresaModel')

function listar(req, res) {
    carroModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var emailRepresentante = req.body.emailRepresentanteServer;
    var senha = req.body.senhaServer;
    
        if (nomeEmpresa == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (razaoSocial == undefined) {
            res.status(400).send("Sua razão social está undefined!");
        } else if (cnpj == undefined) {
            res.status(400).send("Seu CNPJ está undefined!");
        } else if (emailRepresentante == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está undefined!");
        } else {
            empresaModel.cadastrar(nomeEmpresa,razaoSocial,cnpj, emailRepresentante, senha).then(function(resposta){
                res.status(201).send("Empresa criada com sucesso");
            }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })
        }
    }

module.exports ={
    listar,
    cadastrar
}