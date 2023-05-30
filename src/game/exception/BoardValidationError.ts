export default class BoardValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ShipPlacementError';
    }
}