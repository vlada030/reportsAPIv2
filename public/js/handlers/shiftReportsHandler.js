import { elements } from "../elementsList";
import { deleteMessage, showMessage } from "./alertMessagesHandler";
import {
    addWorker,
    removeWorker,
    addItemDorada,
    removeItemDorada,
    addItemProboj,
    removeItemProboj,
} from "../handleUIElements/handleShiftReportsUIElements";

// dodaj radnika
export const addWorkerShiftReports = () => {
    elements.addWorkerButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        let n = document.querySelector("#workersList>tr:last-child").dataset
            .next;
        if (n <= 11) {
            addWorker(n);
        } else {
            showMessage("Najviše možete da dodate 10 radnika", "error");
        }
    });
};

// obriši radnika
export const removeWorkerShiftReports = () => {
    elements.removeWorkerButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        // obrisi stavku
        removeWorker();
    });
};

// dodaj stavku Dorada
export const addItemDoradaShiftReports = () => {
    elements.addItemDoradaButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        let n = document.querySelector("#doradaList>tr:last-child").dataset
            .next;
        if (n <= 11) {
            addItemDorada(n);
        } else {
            showMessage("Najviše možete da dodate 10 stavke", "error");
        }
    });
};

// obriši stavku Dorada
export const removeItemDoradaShiftReports = () => {
    elements.removeItemDoradaButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        // obrisi stavku
        removeItemDorada();
    });
};

// dodaj stavku Proboj
export const addItemProbojShiftReports = () => {
    elements.addItemProbojButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        let n = document.querySelector("#probojList>tr:last-child").dataset
            .next;
        if (n <= 11) {
            addItemProboj(n);
        } else {
            showMessage("Najviše možete da dodate 10 stavke", "error");
        }
    });
};

// obriši stavku Proboj
export const removeItemProbojShiftReports = () => {
    elements.removeItemProbojButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        // obrisi stavku
        removeItemProboj();
    });
};
