export default class ShipCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShipCreationError';
  }
}