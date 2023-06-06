export enum UserEventType {
    readyButtonToggle,
    shipPlacement,
    shot
}

export enum FieldCellHit {
    empty,
    hit
}

export enum FieldCellShip {
    empty,
    ship
}

export enum ShipState {
    intact,
    hit,
    sunk
}

export enum GameTurn {
    player,
    opponent
}