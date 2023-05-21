export default class ShipPlacementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShipPlacementError';
  }
}