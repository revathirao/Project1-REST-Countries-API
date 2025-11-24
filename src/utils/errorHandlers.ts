export class AppError extends Error {
  constructor(message: string, public code?: number) {
    super(message);          // call built-in Error constructor
    this.name = 'AppError';  // identify this as a custom error
  }
}