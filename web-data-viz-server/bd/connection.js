const sql = require('mssql');

const config = {
    user: 'Spectra',
    password: 'Spectra123',
    server: 'localhost',
    database: 'Spectra',
    port: 1433,
    options: {
        encrypt: false,
    },
};

const conexao = new sql.ConnectionPool(config);

module.exports = conexao;