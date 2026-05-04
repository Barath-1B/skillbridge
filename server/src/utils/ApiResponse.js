class ApiResponse {
  constructor(statusCode, data, message, errors = []) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  static ok(res, message = 'Success', data = null) {
    const response = new ApiResponse(200, data, message);
    return res.status(200).json(response);
  }

  static created(res, message = 'Created', data = null) {
    const response = new ApiResponse(201, data, message);
    return res.status(201).json(response);
  }

  static error(res, statusCode, message, errors = []) {
    const response = new ApiResponse(statusCode, null, message, errors);
    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
