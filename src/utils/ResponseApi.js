class ApiResponse {
  constructor(statusCode, message = "Success", data) {
    this.data = data;
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
  }
}
