const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const { auth } = require("../middleware/auth");
const usuarioRoutes = new Router();

usuarioRoutes.post('/', UsuarioController.cadastrar);

usuarioRoutes.get("/", auth, UsuarioController.listar);

usuarioRoutes.put('/:id', auth, UsuarioController.atualizar);

usuarioRoutes.delete('/:id', auth, UsuarioController.deletar);

module.exports = usuarioRoutes