const appointmentService = require('../services/appointmentService');
const { success, created, noContent } = require('../utils/responseHandler');
const { handleErrorResponse } = require('../utils/errorHandler');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        return success(res, appointments);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await appointmentService.getAppointmentById(id);
        return success(res, appointment);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    return created(res, appointment);
  } catch (err) {
    return handleErrorResponse(res, err);
  }
};

const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const appointment = await appointmentService.updateAppointmentStatus(id, status);
        return success(res, { message: 'Appointment status updated successfully', appointment });
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await appointmentService.deleteAppointment(id);
        return noContent(res);
    } catch (err) {
        return handleErrorResponse(res, err);
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment
};