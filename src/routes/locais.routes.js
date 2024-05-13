const { Router } = require("express");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");


const locaisRoutes = new Router();

locaisRoutes.post("/", auth, LocalController.cadastrar_local);

locaisRoutes.get("/", auth, LocalController.listarLocais);

locaisRoutes.get("/:local_id", auth, LocalController.listarUmLocal);

locaisRoutes.get("/:local_id/maps", auth, LocalController.gerarLinkGoogle);

locaisRoutes.delete("/:local_id", auth, LocalController.deletarLocal);

locaisRoutes.put("/:local_id", auth, LocalController.atualizarLocal);

module.exports = locaisRoutes;
