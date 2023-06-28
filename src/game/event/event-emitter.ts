import { EventType } from "../_enums";
import { GameEvent } from "./event";

export class EventEmitter {
    private readonly events: any;

    constructor() {
        this.events = {};
    }

    addListener(event: EventType, fn: (event: GameEvent) => void) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        if (this.events[event].indexOf(fn) === -1) {
            this.events[event].push(fn);        
        }
    }

    removeListener(event: string, fn: (event: GameEvent) => void) {
        this.events[event].splice(this.events[event].indexOf(fn), 1);
    }

    emit(event: GameEvent) {
        if (this.events[event.type]) {
            this.events[event.type].forEach((l: (event: GameEvent) => void) => l(event));
        }
    }
}