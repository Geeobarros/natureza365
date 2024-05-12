const Local = require("../models/Local");
const { default: axios } = require("axios");
const { coordenadas } = require("../services/map.service");

class LocalController {
  async cadastrar_local(req, res) {
    console.log(req.body);
    try {
      const { nome_local, descricao, localidade, coord_geo } = req.body;
      const cep = req.body.cep;

      const resposta = await coordenadas(cep);
      const latitude = resposta.lat;
      const longitude = resposta.lon;

      const usuario_id = req.usuario_id;

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
      res.status(500).json({ mensagem: "Erro ao cadastrar local" });
    }
  }

  async listarLocais(req, res) {
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
      res.status(500).json({ error: "Erro ao buscar lugares" });
    }
  }
  async listarUmLocal(req, res){
    try {
        const usuario_id = req.usuario_id
        const { local_id }= req.params

        const local = await Local.findByPk(local_id)
      

        if(!local){
        return res.status(404).json({mensagem: 'local não encontrado'})
        }
        
        if (local.usuario_id !== usuario_id) {  
            return res.status(403).json({ mensagem: 'Acesso proibido' });
        }
        res.json(local)

    } catch (error) {
        res.status(500).json({messagem: 'Não foi possível listar o local informado'})
    }
}

}

module.exports = new LocalController();
