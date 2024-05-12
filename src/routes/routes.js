const { Router } = require("express")
const locaisRoutes = require("./locais.routes")
const loginRoutes = require("./login.routes")
const usuarioRoutes = require("./usuario.routes")


const routes = Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/local', locaisRoutes)
routes.use('/login', loginRoutes)
routes.use('/usuario', usuarioRoutes)

module.exports = routes