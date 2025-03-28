const User = require("../models/user");
const Barber = require("../models/barber"); 
const bcrypt = require("bcryptjs"); // Apenas uma declaração de bcrypt
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.body;

    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Armazena a senha encriptada
      role,
    });

    // Se o usuário for barbeiro, adiciona na tabela barbers
    if (role === "barbeiro") {
      await Barber.create({
        user_id: user.id,
        bio: bio || "Barbeiro sem descrição",
        created_at: new Date(),
      });
    }

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar usuário!", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Compara a senha fornecida com a senha encriptada no banco
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Senha inválida!" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login!", error });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, 
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário!", error });
  }
};

module.exports = { 
    register,
    login,
    getMe,
};
