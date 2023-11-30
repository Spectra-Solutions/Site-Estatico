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

CREATE TABLE IF NOT EXISTS RegistroComponente(
idRegistroComponente INT PRIMARY KEY AUTO_INCREMENT,
latencia CHAR (6),
consumoUpload DECIMAL (8,3),
consumoDownload DECIMAL (10,3),
especificacao VARCHAR (255),
consumoAtual DECIMAL (8,2),
armazenamentoTotal DECIMAL (8,2),
armazenamentoDisponivel DECIMAL (8,2)
);
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
ls | grep "spectra-ssh-sql-server.jar" &> /dev/null

if [ $? = 0 ];
    then 
        echo "Existe aplicação!"

        sudo docker start spectra_container
        java -jar spectra-ssh-sql-server.jar 
    else 
        echo "Vamos instalar a aplicação Spectra!"
sleep 5
wget https://github.com/Spectra-Solutions/Spectra-Java/releases/download/v1.0/spectra-ssh-sql-server.jar &>/dev/null

sudo docker start spectra_container

sudo chmod +x spectra-ssh-sql-server.jar
java -jar spectra-ssh-sql-server.jar
fi 