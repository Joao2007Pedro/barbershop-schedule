// Repositório para gerenciar operações de banco de dados relacionadas a Service

// Importando o modelo Service para operações de banco de dados
const { Service } = require('../models');

// Função para buscar todos os serviços
const findAll = async () => {
  return Service.findAll();
};             

// Função para buscar um serviço por ID
const findById = async (id) => {
  return Service.findByPk(id);
};  

// Função para criar um novo serviço
const create = async (data) => {
  return Service.create(data);
};

// Função para atualizar um serviço existente
const update = async (id, data) => {
  const serviceInstance = await Service.findByPk(id); 
  if (!serviceInstance) return null;
    return serviceInstance.update(data);
};

// Função para remover um serviço
const remove = async (id) => {
  const serviceInstance = await Service.findByPk(id); 
  if (!serviceInstance) return false;
    await serviceInstance.destroy();
    return true;
};

// Exporta as funções do repositório
module.exports = {
 findAll,
 findAndCount: async ({ where = {}, limit = 10, offset = 0, order = [['created_at', 'DESC']] } = {}) => {
   return Service.findAndCountAll({ where, limit, offset, order });
 },
 findById,
 create,
 update,
 remove,
};
