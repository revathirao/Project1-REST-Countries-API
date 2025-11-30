// Defines a new class `AppError` which inherits from the built-in JavaScript `Error` class.
export class AppError extends Error {
  
  // Declares a public property `status` of type `number` to store an HTTP status code (e.g., 404, 500).
   status: number;
  
  // The constructor function is called when a new instance of `AppError` is created.
  // It accepts a `message` string and a `status` number.
  constructor(message: string, status: number) {
    super(message);          // call built-in Error constructor
    this.name = 'AppError';  // identify this as a custom error
    this.status =status; // Assigns the provided status code to the new instance's `status` property.
  }
}