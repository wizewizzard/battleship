import {initNotificationWindow, instantiateFieldElement} from "./render";
import keys from "../keys";

function applyListeners() {
    document.querySelectorAll('.' + keys.cellClass).forEach(e => {
        e.addEventListener('click', (event) => {
            console.log(event);
        });
    });
}

const {showNotificationWindow, hideNotificationWindow} = initNotificationWindow(document.getElementById(keys.notificationWindowId));
console.log(showNotificationWindow, hideNotificationWindow);
hideNotificationWindow();
const fields = document.querySelectorAll('.' + keys.fieldElementClass);
fields.forEach(e => instantiateFieldElement(e));
console.log(fields);

applyListeners();