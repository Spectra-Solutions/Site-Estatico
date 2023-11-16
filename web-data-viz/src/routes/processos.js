var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/ultimos/:idMaquina", function (req, res) {
    processosController.buscarUltimosProcessos(req, res);
});

module.exports = router;