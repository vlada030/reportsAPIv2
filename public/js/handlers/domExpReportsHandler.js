import { elements } from "../elementsList";
import { deleteMessage, showMessage } from "./alertMessagesHandler";
import { getProduct, deleteReport } from "./ajaxRequestsHandler";
import errorHandler from "./errorHandler";
import {
    updateReportsUI,
    addItem,
    delItem,
    updateTotalLength,
} from "../handleUIElements/handleDomExpReportsUIElements";

export const loadExistingProduct = () => {
    elements.productCode.addEventListener("input", async (e) => {
        e.preventDefault();
        try {
            // 1. proveri početno stanje
            // obriši alert poruku ako je ima
            deleteMessage();
            // uradi update product polja
            updateReportsUI(null);
            // proveri button SAVE / PDF da li su disabled
            elements.saveButton.removeAttribute("disabled");
            elements.savePDFButton.removeAttribute("disabled");

            // NE PRAVI NEPOTREBAN ZAHTEV AKO SIFRA NIJE DUŽINE 7
            if (elements.productCode.value.trim().length !== 7) {
                // blokiraj SAVE button
                elements.saveButton.setAttribute("disabled", "true");
                elements.savePDFButton.setAttribute("disabled", "true");
                throw new Error("Šifra proizvoda se sastoji iz 7 cifara");
            }
            const product = await getProduct(elements.productCode.value.trim());
            // console.log(product)
            if (product && typeof product.data === "string") {
                // AKO JE PRODUCT:DATA STRING , RESPONSE PAYLOAD JE LOGIN PAGE - HTML STRING
                elements.saveButton.setAttribute("disabled", "true");
                elements.savePDFButton.setAttribute("disabled", "true");
                showMessage("Niste logovani", "error");
            } else {
                //AKO POSTOJI PROIZVOD UPDATE UI
                // console.log(product.data.data[0])
                updateReportsUI(product.data.data[0]);
            }
        } catch (error) {
            errorHandler(error);
        }
    });
};

// OBRIŠI DOMREPORT/EXPREPORT IZ BAZE
export const sendDeleteRequestDomExpReports = () => {
    document.addEventListener("click", async (e) => {
        // kada je klinkuto dugme Obriši na modalu
        if (e.target.matches("#eraseReport")) {
            try {
                const eraseID = e.target;
                const reportId = eraseID.dataset.reportid;
                const kindOfReport = eraseID.dataset.report || "";
                // console.log(reportId, kindOfReport);

                await deleteReport(reportId, kindOfReport);
                showMessage("Izveštaj je uspešno obrisan.", "success");

                setTimeout(() => {
                    // MIS broj ima 7 cifre za dom report, exp je ObjectId, shift isto ima ObjectId
                    if (reportId.length === 7) {
                        location.assign("/api/v2/reports/dom");
                    } else if (kindOfReport === "shift") {
                        location.assign("/api/v2/reports/shift");
                    } else {
                        location.assign("/api/v2/reports/exp");
                    }
                }, 1500);
            } catch (error) {
                errorHandler(error);
            }
        }
    });
};

export const addItemExpReport = () => {
    elements.addItemButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        let n = document.querySelector("#drumList>div:last-child").dataset.next;
        if (n <= 20) {
            addItem(n);
            updateTotalLength()
        } else {
            showMessage("Najviše možete da dodate 20 stavki", "error");
        }
    });
};

export const removeItemExpReports = () => {
    elements.delItemButton.addEventListener("click", (e) => {
        e.preventDefault();
        // obriši poruku ako postoji
        deleteMessage();
        // obrisi stavku
        delItem();
        // preracunaj ponovo ukupnu duzinu
        updateTotalLength();
    });
};

export const calculateTotalLengthExpReports = () => {
    elements.drumList.addEventListener("input", function () {
        updateTotalLength();
    });
};

// dom Reports - za pronalazenje izvestaja na osnovu unetog MIS broja
export const sendGetDomReportRequest = () => {
    document.addEventListener("click", (e) => {
        if (e.target.matches("#findMisReportBtn")) {
            const input = document.getElementById("findMisReportInput").value;
            if (!input) {
                showMessage('Niste uneli MIS broj.', 'error')
                return
            }
            
            location.assign(`/api/v2/reports/dom?id=${input}`);
        }
    });
}
