const { sign } = require("jsonwebtoken")
const Usuario = require("../models/Usuario")


class LoginController{ 
    async Login(req, res) {
        try {
            const email = req.body.email
            const senha = req.body.senha

            if(!email && !senha){
                return res.status(404).json({message: 'E-mail ou senha não informados'})
            }
            

            const usuario = await Usuario.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            })
            if(!usuario){
                    
                return res.status(404).json({mensagem: 'Não existe usuário com email e senha informados '})
            }

            const payload = {sub: usuario.id, email:usuario.email, nome:usuario.nome }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({Token: token})
            
        } catch (error) {
            res.status(500).json({error: 'Algo inesperado aconteceu'})
        }
    }
}

module.exports = new LoginController()