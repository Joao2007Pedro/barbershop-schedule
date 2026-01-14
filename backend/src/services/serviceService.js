const ServiceRepository = require('../repositories/serviceRepository');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');

const getAllServices = async () => {
	return ServiceRepository.findAll();
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
