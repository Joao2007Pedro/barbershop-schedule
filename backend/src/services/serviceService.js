const ServiceRepository = require('../repositories/serviceRepository');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');
const { Op } = require('sequelize');

const getAllServices = async (query = {}) => {
	const page = Number(query.page) > 0 ? Number(query.page) : 1;
	const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
	const offset = (page - 1) * pageSize;

	const where = {};
	if (query.name) where.name = { [Op.like]: `%${query.name}%` };
	if (query.minPrice || query.maxPrice) {
		where.price = {};
		if (query.minPrice) where.price[Op.gte] = Number(query.minPrice);
		if (query.maxPrice) where.price[Op.lte] = Number(query.maxPrice);
	}
	if (query.minDuration || query.maxDuration) {
		where.duration = {};
		if (query.minDuration) where.duration[Op.gte] = Number(query.minDuration);
		if (query.maxDuration) where.duration[Op.lte] = Number(query.maxDuration);
	}

	const { rows, count } = await ServiceRepository.findAndCount({
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

const getServiceById = async (id) => {
	const service = await ServiceRepository.findById(id);
	if (!service) throw new NotFoundError('Service not found');
	return service;
};

const createService = async (payload) => {
	const { name, description, price, duration } = payload;
	if (!name || String(name).trim() === '') throw new ValidationError("O campo 'name' é obrigatório.");
	if (!description || String(description).trim() === '') throw new ValidationError("O campo 'description' é obrigatório.");
	if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) throw new ValidationError('Preço inválido.');
	if (duration === undefined || duration === null || isNaN(Number(duration)) || Number(duration) <= 0) throw new ValidationError('Duração inválida.');

	const service = await ServiceRepository.create({
		name,
		description,
		price: Number(price),
		duration: Number(duration),
	});
	return service;
};

const updateService = async (id, payload) => {
	const { name, description, price, duration } = payload;
	if (!name || String(name).trim() === '') throw new ValidationError("O campo 'name' é obrigatório.");
	if (!description || String(description).trim() === '') throw new ValidationError("O campo 'description' é obrigatório.");
	if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) throw new ValidationError('Preço inválido.');
	if (duration === undefined || duration === null || isNaN(Number(duration)) || Number(duration) <= 0) throw new ValidationError('Duração inválida.');

	const updated = await ServiceRepository.update(id, {
		name,
		description,
		price: Number(price),
		duration: Number(duration),
	});
	if (!updated) throw new NotFoundError('Service not found');
	return updated;
};

const deleteService = async (id) => {
	const ok = await ServiceRepository.remove(id);
	if (!ok) throw new NotFoundError('Service not found');
	return true;
};

module.exports = {
	getAllServices,
	getServiceById,
	createService,
	updateService,
	deleteService,
};
