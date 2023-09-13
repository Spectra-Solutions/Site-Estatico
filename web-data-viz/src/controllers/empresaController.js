var empresaModel = require('../models/empresaModel')


function listar(req,res) {
    empresaModel.listar().then(function(resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }
    })
}


function cadastrar(req, res) {
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    
        if (nomeEmpresa == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (razaoSocial == undefined) {
            res.status(400).send("Sua razão social está undefined!");
        } else if (cnpj == undefined) {
            res.status(400).send("Seu CNPJ está undefined!");
        } else{
            empresaModel.cadastrar(nomeEmpresa,razaoSocial,cnpj).then(function(resposta){
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