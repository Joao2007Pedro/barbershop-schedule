const success = (res, data, status = 200) => {
	return res.status(status).json(data);
};

const created = (res, data) => {
	return res.status(201).json(data);
};

const noContent = (res) => {
	// Convencionalmente 204 não deve ter body, mas manter mensagem opcional
	return res.status(204).json({ message: 'No Content' });
};

const failure = (res, message, status = 400) => {
	return res.status(status).json({ message });
};

module.exports = {
	success,
	created,
	noContent,
	failure,
};
