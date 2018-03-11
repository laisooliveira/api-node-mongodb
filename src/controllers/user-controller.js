const userModel = require('../models/user');
const authConfig = require('../../bin/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400,
    });
  }
  
const cadastrarCliente = async (req, res, next) => {
    const { email } = req.body;
    try{ 
        if (await userModel.findOne({ email })){
            return res.status(400).send({ error: 'Esse usuário já existe' });
        }
    const user = await userModel.create(req.body);
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
    }
    catch(err){
        return res.status(400).send({ error: 'Error ao cadastrar cliente' });
    }
}

const login = async (req, res, next) => {
  try{
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    
    if (!user){
      return res.status(400).send({ error: 'Usuário não encontrado' });
    }  
 
    if (!await bcrypt.compare(password, user.password)){
      return res.status(400).send({ error: 'Senha inválida' });
    }
    
    user.password = undefined;    
    res.send({
      user,
      token: generateToken({ id: user.id }),
    });

  }
  catch(err){
    return res.status(400).send({ error: 'Erro ao acessar o login' });
  }
}

module.exports ={
  cadastrarCliente,
  login
}