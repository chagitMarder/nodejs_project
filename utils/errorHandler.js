const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'fail',
        msg: err.message,
    });
};

module.exports = globalErrorHandler;