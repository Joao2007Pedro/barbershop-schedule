const serviceService = require('../services/serviceService');
const { success, created, noContent } = require('../utils/responseHandler');
const { handleErrorResponse } = require('../utils/errorHandler');

const createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body);
        return created(res, service);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices(req.query);
        return success(res, services);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviceService.getServiceById(id);
        return success(res, service);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const updateService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviceService.updateService(id, req.body);
        return success(res, { menssage: 'Service updated', service });
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await serviceService.deleteService(id);
        return noContent(res);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};