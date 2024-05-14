"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nome: "George",
          sexo: "Masculino",
          data_nascimento: "1940-05-04",
          cpf: "111.333.487-12",
          cep: "06397-290",
          endereco: "",
          email: "george@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Chew",
          sexo: "Masculino",
          data_nascimento: "2000-10-01",
          cpf: "123.456.789-10",
          cep: "01001-000",
          endereco: "",
          email: "chew@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Leia",
          sexo: "Feminino",
          data_nascimento: "1955-09-10",
          cpf: "444.333.222-10",
          cep: "88058-500",
          endereco: "",
          email: "leia@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Luke",
          sexo: "Masculino",
          data_nascimento: "1955-09-10",
          cpf: "444.222.222-10",
          cep: "88058-500",
          endereco: "",
          email: "luke@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Han",
          sexo: "Masculino",
          data_nascimento: "1950-04-20",
          cpf: "444.333.487-10",
          cep: "88058-300",
          endereco: "",
          email: "han@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Yoda",
          sexo: "Outros",
          data_nascimento: "1900-05-04",
          cpf: "111.333.487-10",
          cep: "06397-250",
          endereco: "",
          email: "yoda@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Anakin",
          sexo: "Masculino",
          data_nascimento: "1930-05-04",
          cpf: "111.123.487-10",
          cep: "28930-000",
          endereco: "",
          email: "anakin@email.com",
          senha: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
