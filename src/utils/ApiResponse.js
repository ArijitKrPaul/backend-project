class ApiResponse {
  constructor(message = "Api successfull", statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };
