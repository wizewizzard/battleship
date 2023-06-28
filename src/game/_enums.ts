export enum EventType {
    readyToggle,
    shipPlacement,
    shot,
    shipHit,
    shipDestroyed,
    fleetDestroyed,
    blank
}

export enum FieldCellHit {
    empty,
    hit
}

export enum FieldCellShip {
    empty,
    ship
}

export enum GameTurn {
    player,
    opponent
}