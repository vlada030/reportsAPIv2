import { deleteMessage, deleteSuccessMessage } from "./alertMessagesHandler";

export const autoCloseSuccessModalMessage = () => {
    deleteSuccessMessage();
};

export const closeModalMessage = () => {
    document.addEventListener("click", (e) => {
        if (e.target.matches(".close")) {
            deleteMessage();
        }
    });
};

export const togglePasswordFieldVisibility = () => {
    document.addEventListener("click", (e) => {
        const elem = e.target;
        // proveri da li je ikonica kliknuta
        if (elem.matches("[data-togglepassword]")) {
            // uzmi input element
            const inputElem = elem.parentNode.firstChild;
            const type =
                inputElem.getAttribute("type") === "password"
                    ? "text"
                    : "password";

            inputElem.setAttribute("type", type);
            elem.classList.toggle("fa-eye-slash");
        }
    });
};
