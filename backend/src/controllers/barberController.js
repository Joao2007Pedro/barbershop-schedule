const barberService = require('../services/barberService');
const { success, created, noContent } = require('../utils/responseHandler');
const { handleErrorResponse } = require('../utils/errorHandler');

const getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers(req.query);
        return success(res, barbers);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const getBarberById = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await barberService.getBarberById(id);
        return success(res, barber);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const createBarber = async (req, res) => {
  try {
    const barber = await barberService.createBarber(req.body);
    return created(res, barber);
  } catch (err) {
    return handleErrorResponse(res, err);
  }
};

const updateBarber = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await barberService.updateBarber(id, req.body);
        return success(res, barber);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const deleteBarber = async (req, res) => {
    const { id } = req.params;
    try {
        await barberService.deleteBarber(id);
        return noContent(res);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

module.exports = {
    getAllBarbers,
    getBarberById,
    createBarber,
    updateBarber,
    deleteBarber
};