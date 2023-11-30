#!/usr/bin/env bash

echo ""
echo "  ad88888ba                                                                        "
echo " d8       8b                                        ,d                             "
echo " S8,                                                88                             "
echo "  S8aaaaa,    8b,dPPSba,    ,adPPYba,  ,adPPSba,   MM88MMM  8b,dPPSba,  ,adPPSSba, "
echo "         8b,  88P      8a  a8P_____88  a8    ,aa    88      88P     S8          S8 "
echo "          8b  88       d8  8PP         8b           88      88          ,adPPPPP88 "
echo " S8a     a8P  88b,   q,a8   8b,   ,aa  8a,   ,aa    88,     88          88,    ,88 "
echo "   S88888P    88 SbbdP        Sbbd8    ,adPPSba,    S888    88          088bbdPiS8 "
echo "              88                                                                   "
echo "              88                                                                   "
echo 
echo " Olá, esse é o script de instalação da Spectra, vamos lá! " 
echo ""
echo " Vamos iniciar toda a instalação!"
sleep 5



echo ""
echo "1) Vamos atualizar os pacotes de instalação!"
sleep 5

echo "atualizando pacotes..."
sudo apt update &>/dev/null && sudo apt upgrade -y &>/dev/null


echo "Pacotes atualizados!"




echo ""
echo "2) Verificando se existe pasta de instalação"
ls | grep "instalacao_Spectra" &>/dev/null

if [ $? = 0 ];
      then 
	   echo "Pasta existe. Vamos até ela"
sleep 3
       cd instalacao_Spectra

      else
	   echo "Pasta não existe. Vamos criar!"
sleep 3
      mkdir instalacao_Spectra
      cd instalacao_Spectra
fi 



echo ""
echo "3) Verificando se existe pasta de arquivos sql"
ls | grep "arquivos_sql" &>/dev/null

if [ $? = 0 ];
      then 
	   echo "Pasta existe. Vamos até ela"
sleep 3
	   cd arquivos_sql
	
      else
	   echo "Pasta não existe. Vamos criar!"
sleep 3
       mkdir arquivos_sql
       cd arquivos_sql
fi



echo ""
echo "4) Verificando se existe arquivos sql"
ls | grep "001-tabelas.sql" &>/dev/null

if [ $? = 0 ];
      then
	   echo "Arquivo existe!"
sleep 3
	   cd ..

      else
	   echo "Arquivo não existe. Vamos criar!"
sleep 3
echo " 
DROP DATABASE Spectra;
CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE IF NOT EXISTS Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
nomeComponente VARCHAR (45)
);

CREATE TABLE IF NOT EXISTS Empresa(
IdEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR (50),
RazaoSocial VARCHAR (50),
CNPJ CHAR (18),
url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS TaxaAviso(
idTaxaAviso INT PRIMARY KEY AUTO_INCREMENT,
porcentagemCritico DECIMAL (4,2),
porcentagemAlerta DECIMAL (4,2),
fkComponente INT, 
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresa(IdEmpresa)
);

CREATE TABLE IF NOT EXISTS Funcao(
idFuncao INT PRIMARY KEY AUTO_INCREMENT,
tipoFuncao VARCHAR (45)
);

CREATE TABLE IF NOT EXISTS Funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
NomeFunc VARCHAR (50),
EmailFunc VARCHAR (50),
SenhaFunc CHAR (20),
fkEmpresa INT, CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkFuncao INT, CONSTRAINT FOREIGN KEY (fkFuncao) REFERENCES Funcao(idFuncao)
);


CREATE TABLE IF NOT EXISTS TipoAviso(
idTipoAviso INT PRIMARY KEY AUTO_INCREMENT,
nomeAviso VARCHAR (25)
);

CREATE TABLE IF NOT EXISTS Chamado(
idChamado INT AUTO_INCREMENT,
fkFuncionario INT, CONSTRAINT FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
FKTipoAviso INT, CONSTRAINT FOREIGN KEY (fkTipoAviso) REFERENCES TipoAviso(idTipoAviso),
CONSTRAINT PRIMARY KEY (idChamado, fkFuncionario, fkTipoAviso)  
);

CREATE TABLE IF NOT EXISTS Maquina(
idMaquina INT primary key auto_increment,
hostName VARCHAR (255),
nome VARCHAR (50),
sistemaOperacional VARCHAR (50),
secao VARCHAR (50),
qtdDisco INT,
tempoAtividade VARCHAR (50),
fkEmpresaMaquina INT, CONSTRAINT FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE IF NOT EXISTS Servico(
idServico INT PRIMARY KEY AUTO_INCREMENT,
Pid BIGINT,
nomeServico VARCHAR (255),
estado VARCHAR (255),
fkMaquinaServico INT, CONSTRAINT FOREIGN KEY (fkMaquinaServico) REFERENCES Maquina(idMaquina)
);

CREATE TABLE IF NOT EXISTS Processo(
idProcesso INT AUTO_INCREMENT, 
PidProcesso INT,
nomeProcesso VARCHAR (50),
status VARCHAR(20),
usoCpu DECIMAL (8,2),
usoMemoria DECIMAL (8,2),
dtProcesso DATETIME DEFAULT CURRENT_TIMESTAMP,
fkMaquinaProcesso INT, CONSTRAINT FOREIGN KEY (fkMaquinaProcesso) REFERENCES Maquina (idMaquina),
PRIMARY KEY (idProcesso, fkMaquinaProcesso)
);

CREATE TABLE IF NOT EXISTS RegistroAvisos(
idRegistroAviso INT PRIMARY KEY AUTO_INCREMENT,
registroAviso VARCHAR (255),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkComponente INT, CONSTRAINT FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
fkTaxaAviso INT, CONSTRAINT FOREIGN KEY (fkTaxaAviso) REFERENCES TaxaAviso(idTaxaAviso),
fkTipoAviso INT, CONSTRAINT FOREIGN KEY (fkTipoAviso) REFERENCES TipoAviso(idTipoAviso)
); 

CREATE TABLE IF NOT EXISTS RegistroComponente(
idRegistroComponente INT PRIMARY KEY AUTO_INCREMENT,
latencia CHAR (6),
consumoUpload DECIMAL (8,3),
consumoDownload DECIMAL (10,3),
especificacao VARCHAR (255),
consumoAtual DECIMAL (8,2),
armazenamentoTotal DECIMAL (8,2),
armazenamentoDisponivel DECIMAL (8,2),
fkComponente INT, CONSTRAINT FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
fkMaquina INT, CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina)
);

CREATE TABLE IF NOT EXISTS proibicoesJanela(
idProibicao INT PRIMARY KEY auto_increment,
fkMaquinaProibida INT,
janelaProibida VARCHAR(200),
constraint FOREIGN KEY (fkMaquinaProibida) REFERENCES Maquina(idMaquina)
);

CREATE TABLE IF NOT EXISTS infracaoJanela(
idInfracao INT PRIMARY KEY auto_increment,
fkMaquinaInfratora INT,
janelaProibidaAberta VARCHAR(45),
dataDaInfracao DATETIME DEFAULT CURRENT_TIMESTAMP,
constraint FOREIGN KEY (fkMaquinaInfratora) REFERENCES proibicoesJanela(fkMaquinaProibida)
);

CREATE TABLE IF NOT EXISTS Comando(
idComando INT PRIMARY KEY AUTO_INCREMENT,
nomeComando VARCHAR (255),
dtComando DATETIME DEFAULT CURRENT_TIMESTAMP,
stattus BOOLEAN,
fkMaquina INT , CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
fkFuncionario INT, CONSTRAINT FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario)
);

INSERT INTO Componente (nomeComponente) VALUES
	('CPU'),
	('Memoria RAM'),
	('Disco'),
	('Rede');

INSERT INTO Empresa (NomeEmpresa, RazaoSocial, CNPJ, url) VALUES
	('Evelyn', 'Spectra Soluctions', '16.214.201/5475-16', 'https://hooks.slack.com/services/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');

INSERT INTO Funcao (tipoFuncao) VALUES
	('Usuario especial'),
	('Usuario comum');

INSERT INTO Funcionario (NomeFunc, EmailFunc, SenhaFunc, fkEmpresa, fkFuncao) VALUES
	('Evelyn', 'evelyn@spectra.com', '12345678', 1, 1),
    ('Murilo', 'murilo@spectra.com', '12345678', 1, 1);

INSERT INTO TipoAviso(nomeAviso) VALUES
	('Crítico'),
	('Alerta'), 
    ('Crítico e Alerta');

DELIMITER //

CREATE TRIGGER IF NOT EXISTS valida_porcentagem
AFTER INSERT ON RegistroComponente
FOR EACH ROW
BEGIN
    DECLARE porcentagem_maxima DECIMAL(8,2);
    DECLARE porcentagem_alerta DECIMAL(8,2);
    DECLARE id_taxa_aviso INT;
    DECLARE componente_nome VARCHAR(45);

    SELECT ta.porcentagemCritico, ta.porcentagemAlerta, ta.idTaxaAviso, c.nomeComponente
    INTO porcentagem_maxima, porcentagem_alerta, id_taxa_aviso, componente_nome
    FROM TaxaAviso ta
    INNER JOIN Componente c ON c.idComponente = NEW.fkComponente
    INNER JOIN Maquina m ON m.idMaquina = NEW.fkMaquina
    WHERE ta.fkComponente = NEW.fkComponente 
        AND ta.fkEmpresa = m.fkEmpresaMaquina;
        
    IF NEW.consumoAtual > porcentagem_maxima THEN
        INSERT INTO RegistroAvisos (registroAviso, fkComponente, fkTaxaAviso, fkTipoAviso, dtHora)
        VALUES (CONCAT('CRÍTICO - Consumo atual ', componente_nome, ' (', NEW.consumoAtual, '%) ultrapassou o limite máximo (', porcentagem_maxima, '%)'), NEW.fkComponente, id_taxa_aviso, 1, NOW());
    ELSEIF NEW.consumoAtual > porcentagem_alerta THEN
        INSERT INTO RegistroAvisos (registroAviso, fkComponente, fkTaxaAviso, fkTipoAviso, dtHora)
        VALUES (CONCAT('ALERTA - Consumo atual ', componente_nome, ' (', NEW.consumoAtual, '%) ultrapassou o limite de alerta (', porcentagem_alerta, '%)'), NEW.fkComponente, id_taxa_aviso, 2, NOW());
    ELSEIF NEW.consumoAtual < porcentagem_alerta THEN
        INSERT INTO RegistroAvisos (registroAviso, fkComponente, fkTaxaAviso, fkTipoAviso, dtHora)
        VALUES (CONCAT('IDEAL - Consumo atual ', componente_nome, ' (', NEW.consumoAtual, '%) abaixo do limite de alerta (', porcentagem_alerta, '%)'), NEW.fkComponente, id_taxa_aviso, 3, NOW());
    ELSEIF NEW.consumoAtual < porcentagem_maxima THEN
        INSERT INTO RegistroAvisos (registroAviso, fkComponente, fkTaxaAviso, fkTipoAviso, dtHora)
        VALUES (CONCAT('IDEAL - Consumo atual ', componente_nome, ' (', NEW.consumoAtual, '%) abaixo do limite máximo (', porcentagem_maxima, '%)'), NEW.fkComponente, id_taxa_aviso, 3, NOW());
    END IF;

END;

//

DELIMITER ;

INSERT INTO TaxaAviso(porcentagemCritico, porcentagemAlerta, fkComponente, fkEmpresa) VALUES
(80, 60, 1, 1),
(75, 60, 2, 1),
(80, 60, 3, 1);
" > 001-tabelas.sql

    echo "Arquivo tabelas criado criado com sucesso!"
cd ..
fi

echo ""
echo "5) Verificando se máquina possui docker instalado"
sudo docker --version &>/dev/null

if [ $? = 0 ];
      then 
	   echo "Docker já instalado!"
sleep 3
    else
	   echo "Docker não instalado. Vamos instalar!"
sleep 3
    sudo apt install docker.io -y &>/dev/null

	   echo "Iniciando o docker"
sleep 3
    sudo systemctl start docker

    sudo systemctl enable docker
fi

echo ""
echo "6) Verificando se docker possui imagem"
sudo docker images | grep "mysql-spectra" &> /dev/null

if [ $? = 0 ];
      then #entao
	   echo "Imagem já existe"
sleep 3
      else
	   echo "Imagem não existe. Vamos criar o Dockerfile"
sleep 3

echo "FROM mysql:latest" > Dockerfile

echo "" >> Dockerfile

echo "ENV MYSQL_ROOT_PASSWORD=urubu100" >> Dockerfile

echo "ENV MYSQL_DATABASE=Spectra" >> Dockerfile

echo "ENV MYSQL_USER=Spectra" >> Dockerfile

echo "ENV MYSQL_PASSWORD=Spectra123" >> Dockerfile

echo "" >> Dockerfile

echo "COPY ./arquivos_sql/ /docker-entrypoint-initdb.d/" >> Dockerfile

echo "" >> Dockerfile

echo "EXPOSE 3306" >> Dockerfile

echo "Dockerfile criado com sucesso"

	   echo "Buildando imagem com o Dockerfile"
sleep 3
	sudo docker build -t mysql-spectra . &>/dev/null
fi


echo ""
echo "7) Verificando se existe container"
sudo docker ps -a | grep "spectra_container" &> /dev/null

if [ $? = 0 ];
      then #entao
	   echo "Container existe"
sleep 3
	sudo docker start spectra_container

      else
	   echo "Container não existe"
	   echo "Criando o container com a imagem"
sleep 3
      sudo docker run -d --name spectra_container -p 3306:3306 mysql-spectra &>/dev/null

	   echo "Iniciando o container"
sleep 3      
fi

sudo docker start spectra_container

echo ""
echo "8) Verificando se máquina possui o Java 17" &> /dev/null
java -version
if [ $? = 0 ];
      then
	   echo "Java já instalado na máquina"
sleep 3
      else
	   echo "Iniciando a instalação do Java..."
      sudo apt install openjdk-17-jre -y &>/dev/null
	   echo "Java instalado com sucesso!"
sleep 3
fi


echo ""
echo "9) Verificando se existe aplicação na máquina"
ls | grep "spectra.jar" &> /dev/null

if [ $? = 0 ];
    then 
        echo "Existe aplicação!"

        sudo docker start spectra_container
        java -jar spectra.jar 
    else 
        echo "Vamos instalar a aplicação Spectra!"
sleep 5
wget https://github.com/Spectra-Solutions/Spectra-Java/releases/download/v1.0.3/spectra.jar &>/dev/null

sudo docker start spectra_container

sudo chmod +x spectra.jar
java -jar spectra.jar
fi



