const Usuario = require("../models/Usuario");
const Local = require("../models/Local");
const { Map } = require("../services/map.service");
const { error } = require("console");

class UsuarioController {
  async cadastrar(req, res) {
  /**
   * #swagger.tags = ['Login ou cadastrar usuário'].
            #swagger.parameters['body'] = {                
                in: 'body',
                description: 'Cadastra um novo usuário',
                schema: {
                    $nome: 'Ana',
                    $data_nascimento: '1996-12-15',
                    $sexo: 'Feminino',
                    $cpf:  '123.456.789-10',
                    $cep: '01001-000',
                    endereco: " ",
                    $email: 'ana@email.com',
                    $senha: "123456"               
                }
        }
   * #swagger.responses[201] = {description: "Usuário cadastrado com sucesso"}
   * #swagger.responses[400] = {description: "Algum dado incorreto ou faltando"}
   * #swagger.responses[500] = {description: "Erro no servidor"}
  */
    try {
      const { nome, data_nascimento, sexo, cpf, email, senha } = req.body;
      const cep = req.body.cep;
      const endereco = await Map(cep);

      if (!nome) {
        return res.status(400).json({ messagem: "O nome não foi inserido" });
      }

      if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
        return res.status(400).json({
          messagem:
            "A data de nascimento não está no formato correto Ex: 2000-01-01",
        });
      }

      if (!cep.match(/\d{5}-\d{3}/gm)) {
        return res.status(400).json({
          messagem: "O Cep não está no formato correto Ex: 12345-678",
        });
      }

      if (!cpf.match(/\d{3}.\d{3}.\d{3}-\d{2}/)) {
        return res.status(400).json({
          mensagem: "O CPF não está no formato correto Ex: 123.456.789-10",
        });
      }

      if (!email.match(/\S+@\S+\.\S+/gm)) {
        return res
          .status(400)
          .json({ mensagem: "o E-mail não está no formato correto" });
      }

      if (!(senha.length >= 6)) {
        return res
          .status(400)
          .json({ messagem: "Email e senha não podem ser nulos" });
      }

      const usuario = await Usuario.create({
        nome: nome,
        data_nascimento: data_nascimento,
        sexo: sexo,
        cpf: cpf,
        cep,
        endereco: endereco,
        email: email,
        senha: senha,
      });

      return res.status(201).json({ usuario });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error:
          "Algo inesperado aconteceu: Não foi possível cadastrar o usuário",
      });
    }
  }

  async atualizar(req, res) {
    /**
     *     #swagger.tags = ['Usuario'].
            #swagger.parameters['body'] = {                
                in: 'body',
                description: 'atualiza um usuário',
                schema: {
                    $nome: 'Ana',
                    $data_nascimento: '1996-12-15',
                    $sexo: 'Feminino',
                    $cpf:  '123.456.789-10',
                    $cep: '01001-00',
                    endereco: " ",
                    $email: 'ana@email.com',
                    $senha: "123456"               
                }
        }
     * #swagger.responses[200] = {description: "OK"}
    * #swagger.responses[403] = {description: "Não autorizado"}
     *  swagger.responses[404] = {description: "Usuário não encontrado"}
     * #swagger.responses[500] = {description: "Algo inesperado aconteceu"}
                       
    */
    try {
      const usuario_id = req.usuario_id;
      const id = req.params.id;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      if (usuario_id !== usuario.id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      usuario.update(req.body);
      await usuario.save();

      res.status(200).json({ usuario });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        mensagem:
          "Algo inesperado aconteceu: Não foi possível atualizar o usuário",
      });
    }
  }

  async deletar(req, res) {
    /**
     * #swagger.tags = ['Usuario'].
     * #swagger.responses[204] = {description: "OK"}
     * #swagger.responses[403] = {description: "Não autorizado"}
     * #swagger.responses[404] = {description: "Usuário não encontrado"}
     * #swagger.responses[500] = {description: "Algo inesperado aconteceu"}
    */
    try {
      const usuario_id = req.usuario_id; // JWT
      const id = req.params.id;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      if (usuario.id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      const locaisVinculados = await Local.findAll({
        where: { id: usuario_id },
      });
      if (locaisVinculados.length > 0) {
        return res.status(403).json({
          mensagem:
            "Não é possível excluir. Locais vinculados ao usuário encontrados.",
        });
      }

      await usuario.destroy();

      return res.status(204).json({ messagem: "O Usuário foi deletado" });
    } catch (error) {
      res.status(500).json({
        mensagem:
          "Algo inesperado aconteceu: Não foi possível deletar o usuário",
      });
    }
  }
}

module.exports = new UsuarioController();
