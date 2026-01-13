class AppError extends Error {
	constructor(message, statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
	}
}

class ValidationError extends AppError {
	constructor(message) {
		super(message, 400);
	}
}

class NotFoundError extends AppError {
	constructor(message) {
		super(message, 404);
	}
}

const handleErrorResponse = (res, err) => {
	const status = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	return res.status(status).json({ message });
};

module.exports = {
	AppError,
	ValidationError,
	NotFoundError,
	handleErrorResponse,
};
