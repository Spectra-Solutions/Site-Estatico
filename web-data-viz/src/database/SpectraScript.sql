-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

/* CRIEM O USUARIO  SPECTRA PARA NÃO FICAR TROCANDO AS CONFIGURAÇÕES DO BANCO DE DADOS NO CONFIG.JS, VAMOS PADRONIZAR O USO */

DROP DATABASE Spectra;
CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE Empresa (
IdEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR (50),
RazaoSocial VARCHAR (50),
CNPJ CHAR (18)
);

INSERT INTO Empresa VALUES
	(null, 'Mukill3r', 'Murilo LTDA', '12.361.273/8123-12'),
	(null, 'Murilo', 'Murilo SOluctions', '12.361.273/8123-12');
    
SELECT * FROM Empresa;

CREATE TABLE Funcao(
idFuncao INT PRIMARY KEY AUTO_INCREMENT,
tipoFuncao VARCHAR (45), CONSTRAINT CHECK (tipoFuncao in("ADM", "Representante", "Comum"))
);

CREATE TABLE Funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
NomeFunc VARCHAR (50),
EmailFunc VARCHAR (50),
SenhaFunc CHAR (18),
fkEmpresa INT, CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkFuncao INT, CONSTRAINT FOREIGN KEY (fkFuncao) REFERENCES Funcao(idFuncao)
);

INSERT INTO Funcionario VALUES
	(null, "Murilo", "Murilo@spectra.com", "12345678", 1, null),
	(null, "Murilo", "Murilo@gmail.com", "12345678", 2, null);

SELECT fkEmpresa FROM Funcionario WHERE emailFunc = 'Murilo@spectra.com' and senhaFunc = '12345678';
SELECT * FROM Funcionario;

CREATE TABLE TipoAviso (
idTipoAviso INT PRIMARY KEY AUTO_INCREMENT,
nomeAviso VARCHAR (15)
);

CREATE TABLE Chamado (
idChamado INT,
dtChamado DATETIME DEFAULT CURRENT_TIMESTAMP,
fkFuncionario INT, CONSTRAINT FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
FKTipoAviso INT, CONSTRAINT FOREIGN KEY (fkTipoAviso) REFERENCES tipoAviso(idTipoAviso),
CONSTRAINT PRIMARY KEY (idChamado ,fkFuncionario, fkTipoAviso)  
);

CREATE TABLE Maquina(
idMaquina INT primary key auto_increment,
hostName VARCHAR (255),
nome VARCHAR (50),
sistemaOperacional VARCHAR (50),
secao VARCHAR (50),
qtdDisco INT,
fkEmpresaMaquina INT, CONSTRAINT FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa (idEmpresa)
);

select * from Maquina;

CREATE TABLE Processo(
idProcesso INT, 
nomeProcesso VARCHAR (50),
status VARCHAR(20),
dtProcesso DATETIME DEFAULT CURRENT_TIMESTAMP,
fkMaquinaProcesso INT, CONSTRAINT FOREIGN KEY (fkMaquinaProcesso) REFERENCES Maquina (idMaquina),
PRIMARY KEY (idProcesso, fkMaquinaProcesso)
);

CREATE TABLE TaxaAviso(
idTaxaAviso INT PRIMARY KEY AUTO_INCREMENT,
porcentagemCritico DECIMAL (4,2),
porcentagemAlerta DECIMAL (4,2)
);

CREATE TABLE Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
nomeComponente VARCHAR (45), CONSTRAINT CHECK (nomeComponente in("CPU", "Memoria RAM", "Disco", "Rede")),
fkMaquinaComponente INT, CONSTRAINT FOREIGN KEY (fkMaquinaComponente) REFERENCES Maquina(idMaquina),
fkTaxaAviso INT, CONSTRAINT FOREIGN KEY (fkTaxaAviso) REFERENCES TaxaAviso(idTaxaAviso)
);

INSERT INTO Componente Values
	(1, "CPU", null, null),
	(2, "Memoria RAM", null, null),
	(3, "Disco", null, null),
	(4, "Rede", null, null);

select * from Componente;

CREATE TABLE registroAvisos(
idRegistroAviso INT PRIMARY KEY AUTO_INCREMENT,
registroAviso VARCHAR (70),
fkComponente INT, CONSTRAINT FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
fkTaxaAviso INT, CONSTRAINT FOREIGN KEY (fkTaxaAviso) REFERENCES TaxaAviso(idTaxaAviso),
fkTipoAviso INT, CONSTRAINT FOREIGN KEY (fkTipoAviso) REFERENCES TipoAviso(idTipoAviso)
); 

CREATE TABLE RegistroComponente(
idRegistroComponente INT PRIMARY KEY AUTO_INCREMENT,
latencia CHAR (6),
consumoUpload BIGINT,
consumoDownload BIGINT,
nomeCpu VARCHAR (45),
consumoAtual BIGINT,
consumoAtualCpu DECIMAL (17,15),
tempoAtividade DATETIME,
armazenamentoDisponivel DECIMAL (5,2),
armazenamentoTotal DECIMAL (5,2),
armazenamentoEmUso DECIMAL (5,2),
fkComponente INT, CONSTRAINT FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

CREATE TABLE proibicoesJanela (
idProibicao INT PRIMARY KEY auto_increment,
fkMaquinaProibida INT,
janelaProibida VARCHAR(200),
constraint FOREIGN KEY (fkMaquinaProibida) REFERENCES Maquina(idMaquina)
);

CREATE TABLE infracaoJanela(
idInfracao INT PRIMARY KEY auto_increment,
fkMaquinaInfratora INT,
janelaProibidaAberta VARCHAR(45),
dataDaInfracao DATETIME DEFAULT CURRENT_TIMESTAMP,
constraint FOREIGN KEY (fkMaquinaInfratora) REFERENCES proibicoesJanela(fkMaquinaProibida)
);


/* INSERT INTO Registro (idRegistroComponente, consumoAtual, armazenamentoDisponivel, armazenamentoTotal, armazenamentoEmUso, fkComponente) VALUES 
	(null, 37182, 3, 1, 2, 4, 2); */
    
/* INSERT INTO RegistroComponente (idRegistroComponente, consumoUpload, consumoDownload, fkComponente) VALUES
	(null, 35, 124314, 312321, 4); */

select * from RegistroComponente;