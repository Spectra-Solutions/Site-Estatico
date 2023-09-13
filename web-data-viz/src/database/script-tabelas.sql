-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE Empresa (
IdEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR (50),
RazaoSocial VARCHAR (50),
CNPJ CHAR (18)
);

CREATE TABLE usuario (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(50),
emailUsuario VARCHAR(50),
senhaUsuario VARCHAR(50),
fkADM INT default null,
constraint fkADM FOREIGN KEY (fkADM) REFERENCES usuario (IdUsuario),
RepresentanteLegal CHAR (1),
CONSTRAINT ChkRepresentanteLegal CHECK(RepresentanteLegal in('S','N'))
);

insert into empresa values
	(null, 'mur','mur','mur');

INSERT INTO usuario (emailUsuario, senhaUsuario ,RepresentanteLegal) VALUES
        ('${emailRepresentante}', '${senha}', 'S');
    
select * from empresa;
select * from usuario;

TRUNCATE TABLE EMPRESA;
truncate TABLE USUARIO;