import {initNotificationWindow, instantiateFieldElement} from "./render";
import {MessageType} from "./_enum";

function applyListeners() {
    document.querySelectorAll('.field__cell').forEach(e => {
        e.addEventListener('click', () => {
            showNotificationWindow('Hello', MessageType.hint);
        });
    });
    document.getElementById('notification-window').addEventListener('click', () => {
        hideNotificationWindow();
    });
}

const {showNotificationWindow, hideNotificationWindow} = initNotificationWindow(document.getElementById('notification-window'));
const fields = document.querySelectorAll('.player__field');
fields.forEach(e => instantiateFieldElement(e));
console.log(fields);

applyListeners();