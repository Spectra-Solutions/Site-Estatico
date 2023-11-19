// Conexão com o sql server
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

// const mysql = require('mysql2');

// const conexao = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'Spectra',
//     password: 'Spectra123',
//     database: 'Spectra'
// });

// module.exports = conexao;