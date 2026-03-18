function createError(status, message, errors = {}) {
  return {
    status,
    body: {
      timestamp: new Date().toISOString(),
      status,
      message,
      errors
    }
  };
}

module.exports = {
  createError
};
