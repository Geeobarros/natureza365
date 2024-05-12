const Local = require("../models/Local");

class LocalController {
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
}

module.exports = new LocalController();
