import keys from "../keys";
import {MessageType} from "./_enum";

export function instantiateFieldElement(element: Element) {
    element.innerHTML = '';
    for(let i = 0; i < keys.boardSize; i ++) {
        const rowElement: HTMLElement = document.createElement("div");
        rowElement.classList.add('d-flex', 'flex-row', 'field__row');
        for(let j = 0; j < keys.boardSize; j ++) {
            const cell: HTMLElement = document.createElement("div");
            cell.classList.add('field__cell', 'empty');
            rowElement.appendChild(cell);
        }
        element.appendChild(rowElement);
    }
}

export function initNotificationWindow(notificationElement: HTMLElement) {
    const errorClass = 'notification--error';
    const infoClass = 'notification--info';
    return {
        showNotificationWindow: function(message: string, type: MessageType) {
            switch (type) {
                case MessageType.error: {
                    notificationElement.classList.add(errorClass);
                }
                case MessageType.info: {
                    notificationElement.classList.add(infoClass);
                }
            }
            notificationElement.classList.remove('hidden');
        },
        hideNotificationWindow: function() {
            notificationElement.classList.remove(errorClass, infoClass);
            notificationElement.classList.add('hidden');
        }
    };
}


