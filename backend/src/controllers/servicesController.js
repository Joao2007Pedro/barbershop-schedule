const serviceService = require('../services/serviceService');
const { success, created, noContent } = require('../utils/responseHandler');
const { handleErrorResponse } = require('../utils/errorHandler');

// Função para gerenciar serviços
const createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body);
        return created(res, service);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para obter todos os serviços
const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices(req.query);
        return success(res, services);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para obter um serviço por ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviceService.getServiceById(id);
        return success(res, service);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para atualizar um serviço existente
const updateService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviceService.updateService(id, req.body);
        return success(res, { message: 'Serviço atualizado com sucesso', service });
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Função para remover um serviço
const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await serviceService.deleteService(id);
        return noContent(res);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

// Exporta as funções do controlador de serviços
module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};