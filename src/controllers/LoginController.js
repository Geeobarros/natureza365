const { sign } = require("jsonwebtoken")
const Usuario = require("../models/Usuario")


class LoginController{ 
    async Login(req, res) {
        /*  
          #swagger.tags = ['LOGIN'].
            #swagger.parameters['body'] = {
                      in: 'body',
                      description: 'Realiza o login do usuário',
                      schema: {
                          $email: 'usuario@email.com',
                          $senha: "123456"               
                      }
              }
          #swagger.responses[200] = {description: "OK"}
          #swagger.responses[404] = {description: "E-mail ou senha não informados'"}
          #swagger.responses[500] = {description: "Algo inesperado aconteceu"}
      */
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
            console.log(error.message)
            res.status(500).json({error: 'Algo inesperado aconteceu'})
        }
    }
}

module.exports = new LoginController()