const success = (res, data, status = 200) => {
	return res.status(status).json(data);
};

const created = (res, data) => {
	return res.status(201).json(data);
};

const noContent = (res) => {
	// 204 No Content não deve retornar body
	return res.status(204).end();
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
