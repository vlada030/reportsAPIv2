import { elements } from "./elementsList";

import {
    autoCloseSuccessModalMessage,
    closeModalMessage,
    togglePasswordFieldVisibility,
} from "./handlers/generalHandler";

import { manageProductsList } from "./handlers/allProductsHandler";

import {
    initializeUpdateProductPage,
    sendUpdateProductRequest,
} from "./handlers/productHandler";

import {
    loadExistingProduct,
    sendDeleteRequestDomExpReports,
    addItemExpReport,
    removeItemExpReports,
    calculateTotalLengthExpReports,
    sendGetDomReportRequest
} from "./handlers/domExpReportsHandler";

import {
    addWorkerShiftReports,
    removeWorkerShiftReports,
    addItemDoradaShiftReports,
    removeItemDoradaShiftReports,
    addItemProbojShiftReports,
    removeItemProbojShiftReports,
} from "./handlers/shiftReportsHandler";

import {
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    displayAvatarImgProperties,
    updateUserAvatarImg,
    restoreDefaultAvatarImg,
    changeForgottenUserPassword,
} from "./handlers/userHandler";

import { renderPagesAndUI } from "./handlers/paginationHandler";

// ukoliko se koristi window.addEventListener('load', {...}) ceka se onda kompletno ucitana strana i stylesheets i slike dok ovo ucitava samo DOM
document.addEventListener("DOMContentLoaded", async (event) => {
    ///  auto close SAMO success modal poruke
    autoCloseSuccessModalMessage();

    // zatvori modal poruku
    closeModalMessage();

    // toggle vidljivost polja PASSWORD
    // moze da ima vise ovakvih polja na jednoj strani
    togglePasswordFieldVisibility();

    // MANIPULACIJA SA PROIZVODIMA

    // ako je ucitana proizvod update strana
    // provera da li postoji proizvod sa zadatom šifrom prilikom updejta proizvoda
    if (elements.updateProductCode) {
        initializeUpdateProductPage();
    }

    // posalji PUT request za update proizvoda
    if (elements.productHandleForm && elements.saveUpdateButton) {
        sendUpdateProductRequest();
    }

    // ako je ucitana strana sa svim proizvodima
    if (elements.filterTerm) {
        await manageProductsList();
    }

    // MANIPULACIJA SA DOM / EXP REPORTS

    if (elements.productCode) {
        // provera da li postoji proizvod sa zadatom šifrom dom/exp Reports
        loadExistingProduct();
        // obrisi dom/exp report
        sendDeleteRequestDomExpReports();
    }

    // pronadji dom report na osnovu MIS broja
    if (location.toString().includes('dom')) {
        sendGetDomReportRequest();
    }

    // exp reports
    if (elements.expReportsForm) {
        // dodaj stavku
        addItemExpReport();

        // obrisi stavku
        removeItemExpReports();

        // updejtovanje total length polja prilikom unosa nove duzine
        calculateTotalLengthExpReports();
    }

    // MANIPULACIJA SA SHIFT REPORTS

    if (elements.shiftReportsForm) {
        // dodaj radnika
        addWorkerShiftReports();

        // obriši radnika
        removeWorkerShiftReports();

        // dodaj stavku Dorada
        addItemDoradaShiftReports();

        // obriši stavku Dorada
        removeItemDoradaShiftReports();

        // dodaj stavku Proboj
        addItemProbojShiftReports();

        // obriši stavku Proboj
        removeItemProbojShiftReports();
    }

    // MANIPULACIJA SA PODACIMA USERA

    // Update User Name
    if (elements.updateNameForm) {
        updateUserName();
    }

    // Update User Email
    if (elements.updateEmailForm) {
        updateUserEmail();
    }

    // Update User Password
    if (elements.updatePasswordForm) {
        updateUserPassword();
    }

    // Update User Avatar
    if (elements.updateAvatarForm) {
        // FORMATIRANJE CELE FORME
        elements.avatar.style.opacity = 0;

        // inspect avatar image size, url
        displayAvatarImgProperties();

        // send PUT request for avatar update
        updateUserAvatarImg();

        // delete avatar img and restore default
        restoreDefaultAvatarImg();
    }

    // update forgotten user password
    if (elements.forgottenPasswordForm) {
        changeForgottenUserPassword();
    }

    // PAGINATION AND UI RENDERING
    renderPagesAndUI();
});
