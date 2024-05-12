const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");

locaisRoutes.post("/", auth, LocalController.cadastrar_local);

locaisRoutes.get("/", auth, LocalController.listarLocais);

locaisRoutes.get("/:local_id", auth, LocalController.listarUmLocal);

module.exports = locaisRoutes;
