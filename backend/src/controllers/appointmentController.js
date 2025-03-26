const Appointment = require('../models/appointment');
const User = require('../models/user');
const Barber = require('../models/barber');
const Service = require('../models/service');

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        const users = await User.findAll();
        const barbers = await Barber.findAll();
        const services = await Service.findAll();
        appointments.forEach(appointment => {
            const user = users.find(user => user.id === appointment.user_id);
            const barber = barbers.find(barber => barber.id === appointment.barber_id);
            const service = services.find(service => service.id === appointment.service_id);
            appointment.dataValues.user = user;
            appointment.dataValues.barber = barber;
            appointment.dataValues.service = service;
        });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        const user = await User.findByPk(appointment.user_id);
        const barber = await Barber.findByPk(appointment.barber_id);
        const service = await Service.findByPk(appointment.service_id);
        appointment.dataValues.user = user;
        appointment.dataValues.barber = barber;
        appointment.dataValues.service = service;
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAppointment = async (req, res) => {
    const { user_id, barber_id, service_id, appointment_date, status } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ message: "O campo 'user_id' é obrigatório." });
        }
        if (!barber_id) {
            return res.status(400).json({ message: "O campo 'barber_id' é obrigatório." });
        }
        if (!service_id) {
            return res.status(400).json({ message: "O campo 'service_id' é obrigatório." });
        }
        if (!appointment_date) {
            return res.status(400).json({ message: "O campo 'appointment_date' é obrigatório." });
        }
        if (!status) {
            return res.status(400).json({ message: "O campo 'status' é obrigatório." });
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        const barber = await Barber.findByPk(barber_id);
        if (!barber) {
            return res.status(404).json({ message: "Barbeiro não encontrado." });
        }
        const service = await Service.findByPk(service_id);
        if (!service) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }
        const appointment = await Appointment.create({ user_id, barber_id, service_id, appointment_date, status });
        appointment.dataValues.user = user;
        appointment.dataValues.barber = barber;
        appointment.dataValues.service = service;
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        if (!status) {
            return res.status(400).json({ message: "O campo 'status' é obrigatório." });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        await appointment.destroy();
        res.status(204).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment
};