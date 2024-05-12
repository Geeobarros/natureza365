const Usuario = require("../models/Usuario");
const Local = require("../models/Local");
const { Map } = require("../services/map.service");

class UsuarioController {
    async cadastrar(req, res) {
        /*  
                #swagger.tags = ['Usuario'].
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Cadastra um novo usuário',
                    schema: {
                        $nome: 'Ana',
                        $data_nascimento: '1996-12-15',
                        $sexo: 'Feminino',
                        $cpf:  '123.456.789-10',
                        $cep: '12345-678',
                        endereco: " ",
                        $email: 'usuario@email.com',
                        $senha: "123456"               
                    }
            }
            #swagger.responses[201] = {description: "Usuário cadastrado com sucesso"}
            #swagger.responses[400] = {description: "Algum dado incorreto ou faltando"}
            #swagger.responses[500] = {description: "Erro no servidor"}
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
          res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
        }
      }

      async listar(req, res) {
        /*  
            #swagger.tags = ['Usuario'].
                description: 'Lista os usuários',
        #swagger.responses[200] = {description: "OK"}
        #swagger.responses[500] = {description: "Erro no servidor"}
    */
    const usuario = await Usuario.findAll();
    res.json({ usuario });
  }

  async atualizar(req, res) {
    try { 
      /*  
            #swagger.tags = ['Usuario'].
            #swagger.parameters['usuario_id'] = {
                in: 'body',
                description: 'Cadastra um novo usuário',
                schema: {
                    $nome: 'Ana',
                    $data_nascimento: '1996-12-15',
                    $sexo: 'Feminino',
                    $cpf:  '123.456.789-10',
                    $cep: '12345-678',
                    endereco: " ",
                    $email: 'usuario@email.com',
                    $senha: "123456"               
                }
        }
        #swagger.responses[201] = {description: "Usuário cadastrado com sucesso"}
        #swagger.responses[400] = {description: "Algum dado incorreto ou faltando"}
        #swagger.responses[500] = {description: "Erro no servidor"}
    */
      const usuario_id = req.usuario_id; // JWT
      const id = req.params.id;

      // Verifique se o usuário existe
      const usuario = await Usuario.findByPk(usuario_id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Verifique se o usuário tem permissão para atualizar
      if (usuario.id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      // Atualize os campos do usuário com base no corpo da requisição
      usuario.update(req.body);
      await usuario.save();

      // Responda com o usuário atualizado
      res.json(usuario);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      res
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o usuário" });
    }
  }

  async deletar(req, res) {
    try {
      const usuario_id = req.usuario_id; // JWT
      const id = req.params.id;

      const usuario = await Usuario.findByPk(usuario_id);
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

      res.json({ mensagem: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ mensagem: "Não foi possível deletar o usuário" });
    }
  }
}

module.exports = new UsuarioController();