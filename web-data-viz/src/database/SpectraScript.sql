-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

DROP DATABASE Spectra;
CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE Empresa (
IdEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR (50),
CNPJ CHAR (18)
);

CREATE TABLE Funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
NomeFuncionario VARCHAR (50),
EmailFuncionario VARCHAR (50),
Senha CHAR (18),
FuncionarioADM INT, CONSTRAINT FOREIGN KEY (FuncionarioADM) REFERENCES Funcionario (IdFuncionario),
fkRepresentante INT, CONSTRAINT FOREIGN KEY (FkRepresentante) REFERENCES Funcionario (IdFuncionario),
fkEmpresaFuncionario INT, CONSTRAINT FOREIGN KEY (fkEmpresaFuncionario) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Rede (
idRede INT PRIMARY KEY AUTO_INCREMENT, 
Latencia CHAR (6),
ConsumoUpload DECIMAL (10,2),
ConsumoDownload DECIMAL (10,2)
);

CREATE TABLE Maquina(
idMaquina INT AUTO_INCREMENT,
NumeroIP CHAR (32),
Secao VARCHAR (50),
FkEmpresaMaquina INT, CONSTRAINT FOREIGN KEY (FkEmpresaMaquina) REFERENCES Empresa (idEmpresa),
CONSTRAINT PRIMARY KEY (IdMaquina, FkEmpresaMaquina),
fkRedeMaquina INT, CONSTRAINT FOREIGN KEY (fkRedeMaquina) REFERENCES Rede (idRede)
);

CREATE TABLE CPU(
idCPU INT AUTO_INCREMENT,
ConsumoAtual DECIMAL (5,2),
ConsumoPorCore DECIMAL (5,2),
TempoPorAtividade DATETIME DEFAULT CURRENT_TIMESTAMP,
fkMaquinaCPU INT, CONSTRAINT FOREIGN KEY (fkMaquinaCPU) REFERENCES Maquina (idMaquina),
CONSTRAINT PRIMARY KEY (idCPU, fkMaquinaCPU)
);

CREATE TABLE MemoriaRam(
idMemoriaRam INT AUTO_INCREMENT,
ConsumoAtual INT,
ConsumoPorProcesso DECIMAL (5,2),
MemoriaDisponivel INT,
fkMaquinaMemoriaRam INT, CONSTRAINT FOREIGN KEY (fkMaquinaMemoriaRam) REFERENCES Maquina (idMaquina),
CONSTRAINT PRIMARY KEY (idMemoriaRam, fkMaquinaMemoriaRam)
);

CREATE TABLE Disco(
idDisco INT AUTO_INCREMENT,
ConsumoAtual FLOAT,
MemoriaDisponivel FLOAT,
fkMaquinaDisco INT, CONSTRAINT FOREIGN KEY (fkMaquinaDisco) REFERENCES Maquina  (idMaquina),
CONSTRAINT PRIMARY KEY (idDisco, fkMaquinaDisco)
);