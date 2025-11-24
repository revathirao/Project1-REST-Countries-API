export class AppError extends Error {
    status;
    constructor(message, status) {
        super(message); // call built-in Error constructor
        this.name = 'AppError'; // identify this as a custom error
        this.status = status;
    }
}
//# sourceMappingURL=errorHandlers.js.map