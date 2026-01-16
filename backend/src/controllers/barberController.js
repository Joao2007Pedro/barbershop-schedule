const barberService = require('../services/barberService');
const { success, created, noContent } = require('../utils/responseHandler');
const { handleErrorResponse } = require('../utils/errorHandler');

// Função para gerenciar barbers
const getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers(req.query);
        return success(res, barbers);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para obter um barber por ID
const getBarberById = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await barberService.getBarberById(id);
        return success(res, barber);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para criar um novo barber
const createBarber = async (req, res) => {
  try {
    const barber = await barberService.createBarber(req.body);
    return created(res, barber);
  } catch (err) {
    return handleErrorResponse(res, err);
  }
};

// Função para atualizar um barber existente
const updateBarber = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await barberService.updateBarber(id, req.body);
        return success(res, barber);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para remover um barber
const deleteBarber = async (req, res) => {
    const { id } = req.params;
    try {
        await barberService.deleteBarber(id);
        return noContent(res);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Exporta as funções do controlador de Barbeiro
module.exports = {
    getAllBarbers,
    getBarberById,
    createBarber,
    updateBarber,
    deleteBarber
};