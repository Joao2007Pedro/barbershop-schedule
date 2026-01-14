// Repositório para gerenciar operações de banco de dados relacionadas a Barber

// Importando o modelo Barber para operações de banco de dados
const Barber = require('../models/barber');

// Função para buscar todos os barbeiros
const findAll = async () => {
  return Barber.findAll();
};

// Função para buscar um barbeiro por ID
const findById = async (id) => {
  return Barber.findByPk(id);
};

// Função para criar um novo barbeiro
const create = async (data) => {
    return Barber.create(data); 
};

// Função para atualizar um barbeiro existente
const update = async (id, data) => {
  const barber = await Barber.findByPk(id); 
    if (!barber) return null;

    return barber.update(data);
};

// Função para remover um barbeiro
const remove = async (id) => {
  const barber = await Barber.findByPk(id); 
    if (!barber) return false;

    await barber.destroy();
    return true;
};

// Exporta as funções do repositório
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};