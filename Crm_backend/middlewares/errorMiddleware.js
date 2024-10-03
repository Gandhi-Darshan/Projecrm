const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 404;
    res.status(statusCode).json({ message: err.message });
    //next()
  };
  
  module.exports = errorHandler;
  