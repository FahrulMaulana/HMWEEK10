
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
require('dotenv').config();

const register = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await userModel.register(email, password);
      if (result.success) {
        return res.status(200).send({ email: result.user.email, message: result.message });
      } else {
        return res.status(400).send({ message: result.message });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.login(email, password);
      if (!user) {
        return res.status(401).send({ auth: false, message: 'email atau password salah.' });
      }
  
      const token = jwt.sign({ email: user.email, password: user.password }, process.env.SECRET_KEY, { expiresIn: 86400 });
      res.status(200).send({ auth: true, email: user.email, message: 'Login Berhasil', token });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

module.exports = {
    register,
    login
}


