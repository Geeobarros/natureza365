const { Router } = require("express")


const routes = new Router()

routes.get('/', (req, res)=>{
    res.send('ola')
})

   

module.exports = routes

