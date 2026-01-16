const BarberRepository = require('../repositories/barberRepository');
const User = require('../models/user');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');
const { Op } = require('sequelize');

const enrichBarber = async (barber) => {
	if (!barber) return null;
	const user = await User.findByPk(barber.user_id);
	barber.dataValues.user = user || null;
	return barber;
};

const getAllBarbers = async (query = {}) => {
	const page = Number(query.page) > 0 ? Number(query.page) : 1;
	const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
	const offset = (page - 1) * pageSize;

	const where = {};
	if (query.user_id) where.user_id = Number(query.user_id);
	if (query.bio) where.bio = { [Op.like]: `%${query.bio}%` };

	const { rows, count } = await BarberRepository.findAndCount({
		where,
		limit: pageSize,
		offset,
		order: [['created_at', 'DESC']],
	});

	return {
		items: rows,
		page,
		pageSize,
		total: count,
		totalPages: Math.ceil(count / pageSize),
	};
};

const getBarberById = async (id) => {
	const barber = await BarberRepository.findById(id);
	if (!barber) throw new NotFoundError('Barber not found');
	return enrichBarber(barber);
};

const createBarber = async (payload) => {
	const { user_id, bio } = payload;
	if (!user_id) throw new ValidationError("O campo 'user_id' é obrigatório.");
	if (!bio || String(bio).trim() === '') throw new ValidationError("O campo 'bio' é obrigatório.");

	const user = await User.findByPk(user_id);
	if (!user) throw new NotFoundError('Usuário não encontrado.');

	const barber = await BarberRepository.create({ user_id, bio });

	// Promover usuário a barbeiro, se necessário
	if (user.role !== 'barbeiro') {
		await user.update({ role: 'barbeiro' });
	}

	barber.dataValues.user = user;
	return barber;
};

const updateBarber = async (id, payload) => {
	const { bio } = payload;
	if (!bio || String(bio).trim() === '') throw new ValidationError("O campo 'bio' é obrigatório.");

	const updated = await BarberRepository.update(id, { bio });
	if (!updated) throw new NotFoundError('Barber not found');
	return enrichBarber(updated);
};

const deleteBarber = async (id) => {
	const barber = await BarberRepository.findById(id);
	if (!barber) throw new NotFoundError('Barber not found');

	const user = await User.findByPk(barber.user_id);

	// Remover o barbeiro
	await BarberRepository.remove(id);

	// Se o usuário tinha papel barbeiro e agora não existem mais barbeiros no sistema, rebaixa para cliente
	if (user && user.role === 'barbeiro') {
		const remaining = await BarberRepository.findAll();
		if (!remaining || remaining.length === 0) {
			await user.update({ role: 'cliente' });
		}
	}

	return true;
};

module.exports = {
	getAllBarbers,
	getBarberById,
	createBarber,
	updateBarber,
	deleteBarber,
};