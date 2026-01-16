const BarberRepository = require('../repositories/barberRepository');
const User = require('../models/user');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');
const { Op } = require('sequelize');

// Função para enriquecer os dados do barbeiro com informações do usuário relacionado
const enrichBarber = async (barber) => {
	if (!barber) return null;
	const user = await User.findByPk(barber.user_id);
	barber.dataValues.user = user || null;
	return barber;
};

// Função para obter barbeiros com filtros e paginação
const getAllBarbers = async (query = {}) => {
	const page = Number(query.page) > 0 ? Number(query.page) : 1;
	const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
	const offset = (page - 1) * pageSize;

	// Filtros dinâmicos
	const where = {};
	if (query.user_id) where.user_id = Number(query.user_id);
	if (query.bio) where.bio = { [Op.like]: `%${query.bio}%` };

	// Ordenação dinâmica com whitelist
	const allowedSortFields = ['created_at', 'bio', 'user_id'];
	const sortBy = allowedSortFields.includes(String(query.sortBy)) ? String(query.sortBy) : 'created_at';
	const sortDir = String(query.sortDir).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

	// Consulta ao repositório com filtros, paginação e ordenação
	const { rows, count } = await BarberRepository.findAndCount({
		where,
		limit: pageSize,
		offset,
		order: [[sortBy, sortDir]],
	});

	return {
		items: rows,
		page,
		pageSize,
		total: count,
		totalPages: Math.ceil(count / pageSize),
	};
};

// Função para obter um barbeiro por ID
const getBarberById = async (id) => {
	// Obtém barbeiro pelo ID e enriquece com dados do usuário relacionado
	const barber = await BarberRepository.findById(id);
	if (!barber) throw new NotFoundError('Barbeiro não encontrado');
	return enrichBarber(barber);
};

// Função para criar um novo barbeiro
const createBarber = async (payload) => {
	const { user_id, bio } = payload;
	if (!user_id) throw new ValidationError("O campo 'user_id' é obrigatório.");
	if (!bio || String(bio).trim() === '') throw new ValidationError("O campo 'bio' é obrigatório.");

	// Verifica se o usuário existe
	const user = await User.findByPk(user_id);
	if (!user) throw new NotFoundError('Usuário não encontrado.');

	const barber = await BarberRepository.create({ user_id, bio });

	// Atualiza o papel do usuário para 'barbeiro' se necessário
	if (user.role !== 'barbeiro') {
		await user.update({ role: 'barbeiro' });
	}

	barber.dataValues.user = user;
	return barber;
};

// Função para atualizar um barbeiro existente
const updateBarber = async (id, payload) => {
	const { bio } = payload;
	if (!bio || String(bio).trim() === '') throw new ValidationError("O campo 'bio' é obrigatório.");

	const updated = await BarberRepository.update(id, { bio });
	if (!updated) throw new NotFoundError('Barbeiro não encontrado');
	return enrichBarber(updated);
};

// Função para deletar um barbeiro
const deleteBarber = async (id) => {
	const barber = await BarberRepository.findById(id);
	if (!barber) throw new NotFoundError('Barbeiro não encontrado');

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