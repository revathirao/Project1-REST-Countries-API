export class AppError extends Error {
    status: number;
  constructor(message: string, status: number) {
    super(message);          // call built-in Error constructor
    this.name = 'AppError';  // identify this as a custom error
    this.status =status;
  }
}