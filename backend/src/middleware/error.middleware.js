const errorMiddleware = (err, req, res, next) => {
    // Get status code
    const statusCode = err.status || err.statusCode || 500;

    // Get message
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: statusCode,
        message: message
    });
}

module.exports = errorMiddleware;