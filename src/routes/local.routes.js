const { Router } = require("express");
const Local = require("../models/Local");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");

locaisRoutes.post("/", auth, LocalController.cadastrar_local);

locaisRoutes.get("/", auth, LocalController.listarLocais);

module.exports = locaisRoutes;
