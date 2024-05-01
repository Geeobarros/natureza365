const { Router } = require("express")
const Professor = require("../models/Professor")

const routes = new Router()

routes.post('/professor', async(req, res) =>{
    const {nome, materia} = req.body

    const professor = await Professor.create({
        nome,
        materia,
        
    })
    res.json({ professor })
})

module.exports = routes

