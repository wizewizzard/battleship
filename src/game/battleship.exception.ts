export class BoardValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BoardValidationError';
    }
}

export class ShipCreationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ShipCreationException';
    }
}