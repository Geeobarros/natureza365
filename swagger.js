const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
        title: 'Natureza365', 
        description: 'Projeto Natureza365', 
        version: "2.0.0"
    },
        host: "localhost:3333", 
        security: [{"apiKeyAuth": []}],
        securityDefinitions: {
            apiKeyAuth: {
            type: 'apikey',
            //organização das rotas para o swagger
            in: 'header', // can be 'header', 'query' or 'cookie'
            name: 'Authorization', // name of the header, query parameter or cookie description: 'Token de Autenticação'
        }

        }
}
const outputFile = './src/swagger.json'
const routes = ['./src/server.js']


swaggerAutogen(outputFile, routes, doc)