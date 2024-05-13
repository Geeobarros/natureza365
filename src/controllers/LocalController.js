const Local = require("../models/Local");
const { default: axios } = require("axios");
const { coordenadas } = require("../services/map.service");

class LocalController {
  async cadastrar_local(req, res) {
    /*  
          #swagger.tags = ['Local'].
          #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Cadastra um novo usuário',
                    schema: {
                      $nome_local: "Museu arqueológico a céu aberto",
                      $descricao: "Lado direito da praia do Santinho",
                      $localidade: "Santinho",
                      cep: "88058-700",
                      latitude: "",                      
                      longitude: ""           
                    }
            }
            #swagger.responses[201] = {description: "Usuário cadastrado com sucesso"}
            #swagger.responses[400] = {description: "Algum dado incorreto ou faltando"}
            #swagger.responses[500] = {description: "Erro no servidor"}
  */
    console.log(req.body);
    try {
      const { nome_local, descricao, localidade, } = req.body;
      const cep = req.body.cep;

      const resposta = await coordenadas(cep);
      const latitude = resposta.lat;
      const longitude = resposta.lon;

      const usuario_id = req.usuario_id;

      if (!cep.match(/\d{5}-\d{3}/gm)) {
        return res.status(400).json({
          messagem: "O Cep não está no formato correto Ex: 12345-678",
        });
      }

      const local = await Local.create({
        nome_local: nome_local,
        usuario_id: usuario_id,
        descricao: descricao,
        localidade: localidade,
        cep: cep,
        latitude: latitude,
        longitude: longitude,
      });
      res.status(201).json({ local });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ mensagem: "Algo inesperado ocorreu" });
    }
  }

  async listarLocais(req, res) {
     /*  
            #swagger.tags = ['Local'].
                description: 'Lista os locais',
        #swagger.responses[200] = {description: "OK"}
        #swagger.responses[500] = {description: "Erro no servidor"}
    */
    try {
      const usuario_id = req.usuario_id;

      if (!req.usuario_id) {
        return res.status(401).json({ mensagem: "Acesso não autorizado" });
      }

      const locais = await Local.findAll({
        where: { usuario_id: usuario_id },
      });

      res.status(200).json({ locais });
    } catch (error) {
      res.status(500).json({ mensagem: "Algo inesperado ocorreu" });
    }
  }
  async listarUmLocal(req, res) {

      /*  
            #swagger.tags = ['Local'].
             #swagger.parameters['id'] = {
                in: 'path',
                description: 'Lista um local por ID',
        #swagger.responses[200] = {description: "OK"}
        #swagger.responses[404] = {description: "Local não encontrado"}
        #swagger.responses[500] = {description: "Erro no servidor"}
    */
    try {
      const usuario_id = req.usuario_id;
      const { local_id } = req.params;

      const local = await Local.findByPk(local_id);

      if (!local) {
        return res.status(404).json({ mensagem: "local não encontrado" });
      }

      if (local.usuario_id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }
      res.json(local);
    } catch (error) {
      res.status(500).json({ mensagem: "Algo inesperado ocorreu: Não foi possível localizar este local" });
    }
  }
  async gerarLinkGoogle(req, res) {
    /*  
            #swagger.tags = ['Local'].
             #swagger.parameters['id'] = {
                in: 'path',
                description: 'Gera um link no Google Mapa da localização do local pelo ID informado',
        #swagger.responses[200] = {description: "OK"}
        #swagger.responses[403] = {description: "Acesso não autorizado"}        
        #swagger.responses[404] = {description: "Local não encontrado"}
        #swagger.responses[500] = {description: "Algo inesperado ocorreu: Não foi possível gerar o link""}
    */
    try {
      const usuario_id = req.usuario_id;
      const local_id = req.params.local_id;

      let local = await Local.findByPk(local_id);

      if (!local) {
        return res.status(404).json({ mensagem: "local não encontrado" });
      }

      const { latitude, longitude } = local;

      if (local.usuario_id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      const linkGoogle = `https://www.google.com/maps?q=${latitude},${longitude}`;

      return res.status(200).json({ linkGoogle });
    } catch (error) {
      return  res.status(500).json({ mensagem: "Algo inesperado ocorreu: Não foi possível gerar o link" });
    }
  }

  async atualizarLocal(req, res) {
    /*  
          #swagger.tags = ['Local'].
          #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Atualiza informações do local',
                    schema: {
                      $nome_local: "Museu arqueológico a céu aberto",
                      $descricao: "Lado direito da praia do Santinho",
                      $localidade: "Santinho",
                      cep: "12345-678",
                      latitude: "",                      longitude: ""           
                    }
            }
            #swagger.responses[201] = {description: "Local atualizado com sucesso"}
            #swagger.responses[403] = {description: "Acesso proibido"}
            #swagger.responses[404] = {description: "ID do local não encontrado"}
            #swagger.responses[500] = {description: "Algo inesperado ocorreu: Não foi possível atualizar as informações do local"}
  */
    try {
      const usuario_id = req.usuario_id;
      const local_id = req.params.local_id;

      const local = await Local.findByPk(local_id);

      if(!local_id){
        return res.status(404).json({ mensagem: "ID do local não encontrado"})
      }

      if (local.usuario_id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      local.update(req.body);
      await local.save();

      res.json(local);
    } catch (error) {
      res
      .status(500)
      .json({ mensagem: "Algo inesperado ocorreu: Não foi possível atualizar as informações do local" });
    }
  }

  async deletarLocal(req, res) {
    /*  
            #swagger.tags = ['Local'].
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'Deleta um local',
               
        }
        #swagger.responses[204] = {description: "O local foi Deletado"}
        #swagger.responses[403] = {description: "Acesso proibido"}
        #swagger.responses[404] = {description: "Local não encontrado"}
        #swagger.responses[500] = {description: "Erro no servidor"}
    */
    try {
      const usuario_id = req.usuario_id;
      const local_id = req.params.local_id;

      const local = await Local.findByPk(local_id);

      if (local.usuario_id !== usuario_id) {
        return res.status(403).json({ mensagem: "Acesso proibido" });
      }

      if(!local_id){
        res.status(404).json({ mensagem: "Local não encontrado" });
      }

      await Local.destroy({
        where: { id: local_id },
      });

      return res.status(204).json({ messagem: "O Local foi deletado" });
    } catch (error) {
      res
      .status(500)
      .json({ mensagem: "Algo inesperado ocorreu: Não foi possível deletar o local" });
      
    }
  }
}

module.exports = new LocalController();
