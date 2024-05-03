# natureza365

O Natureza365 é uma plataforma que permite aos usuários explorar e contribuir para a preservação da natureza, fornecendo acesso a informações sobre áreas naturais, trilhas, parques ecológicos, reservas ambientais e outros locais de interesse para os amantes da natureza. 

## 🛠️ Abrir e rodar o projeto 

### Na primeira vez é necessário instalar as dependencias:
npm install
### Se for em ambiente local:
npm install --dev
### Utilizar o .env_example para configurar o .env para executar no ambiente local
cp .env_example .env

## Para rodar o repositório em ambiente local
nodemon ./src/index.js

## Trabalhando com migrations:
### Criar uma migration
sequelize migration:generate --name criar_tabela
npx sequelize-cli migration:generate --name criar_tabela

### Rodar uma migration. Opções:
Opção nº 1: sequelize db:migrate
Opção nº 2: npx sequelize db:migrate

### Reverter a última migration:
sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo

### Documentação do Sequelize:
https://sequelize.org/docs/v6/core-concepts/model-basics/

## Bibliotecas utilizadas:
### instalar o sequelize
npm install sequelize

### instalar o driver do PostgreSQL
npm install pg

### instalar o CLI do sequelize
npm install -g sequelize-cli

### instalar o dotenv
npm install dotenv

