const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    console.log("acessou o jwt");

    const { authorization } = req.headers;

    req["payload"] = verify(authorization, process.env.SECRET_JWT);
    req.usuario_id = req.payload.sub; //para pegar o id do usuario

    next();
  } catch (error) {
    return res.status(404).json({
      message: "Autenticação falhou!",
      cause: error.message,
    });
  }
}

module.exports = { auth };