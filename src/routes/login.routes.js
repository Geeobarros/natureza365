const { Router } = require("express");
const LoginController = require("../controllers/LoginController");
const loginRoutes = new Router()

loginRoutes.post('/', LoginController.Login)

module.exports = loginRoutes