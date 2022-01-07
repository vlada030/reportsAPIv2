// bez ovoga ne radi npr async/await... i blokira celu app
import {getProduct, updateProduct, deleteReport, updateUserDetail, deleteUserAvatar, updateForgottenPassword, getAdvancedResultsData} from './ajaxRequests';
import errorHandler from './errorHandler';
import {
    showMessage,
    deleteMessage,
    deleteSuccessMessage,
} from "./manageAlertMessages";
import { updateReportsUI, updateProductUI, addItem, delItem, updateTotalLength, addWorker, removeWorker, addItemDorada, removeItemDorada, addItemProboj, removeItemProboj, renderPaginatedUI} from './userInterface';
import { elements } from "./elementsList";


window.addEventListener('DOMContentLoaded', (event) => {
    /// brisanje sa delayem SAMO success poruke
    deleteSuccessMessage();

    // ZATVORI INFO PROZOR / MODAL...
    document.addEventListener("click", (e) => {
        if (e.target.matches(".close")) {
            deleteMessage();
        }
    });

    // toggle vidljivost polja PASSWORD
    // ovakva forma jel moze da ima vise ovakvih polja na jednoj strani
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

    // provera da li postoji proizvod sa zadatom šifrom dom/exp Reports
    if (elements.productCode) {
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
                const product = await getProduct(
                    elements.productCode.value.trim()
                );
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
    }
    // provera da li postoji proizvod sa zadatom šifrom prilikom updejta proizvoda
    if (elements.updateProductCode) {
        elements.updateProductCode.addEventListener("input", async (e) => {
            e.preventDefault();
            try {
                // 1. proveri početno stanje
                // obriši alert poruku ako je ima
                deleteMessage();
                // uradi update product polja
                updateProductUI(null);
                // proveri button SAVE / PDF da li su disabled
                elements.saveUpdateButton.removeAttribute("disabled");

                // NE PRAVI NEPOTREBAN ZAHTEV AKO SIFRA NIJE DUŽINE 7
                if (elements.updateProductCode.value.trim().length !== 7) {
                    // blokiraj SAVE button
                    elements.saveUpdateButton.setAttribute("disabled", "true");
                    throw new Error("Šifra proizvoda se sastoji iz 7 cifara");
                }
                // console.log(updateProductCode.value);
                const product = await getProduct(
                    updateProductCode.value.trim()
                );
                if (product) {
                    // AKO POSTOJI PROIZVOD UPDATE UI
                    // console.log(product.data.data[0])
                    updateProductUI(product.data.data[0]);
                }
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // OBRIŠI DOMREPORT/EXPREPORT IZ BAZE
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

    // POŠALJI PUT REQUEST ZA UPDATE PROIZVODA
    if (elements.productHandleForm && elements.saveUpdateButton) {
        elements.saveUpdateButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                let data = {};

                // obriši alert poruku ako je ima
                deleteMessage();

                // pretvori node list u array
                let formData = Array.from(elements.productHandleForm.elements);
                // kreiraj data object {name: value} i izbaci button element i csrf token input
                formData.forEach((el) => {
                    if (
                        el.getAttribute("type") !== "hidden" &&
                        el.tagName.toLowerCase() !== "button"
                    ) {
                        data[el.name] = el.value;
                    }
                });
                const result = await updateProduct(data.sifra, data);
                // console.log(result);

                if (result.data.success === true) {
                    showMessage("Proizvod je uspešno izmenjen.", "success");
                    setTimeout(() => {
                        location.assign("/api/v2/reports/dom");
                    }, 1000);
                }
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // EXP REPORTS FORMA DODAJ / OBRIŠI STAVKU, PRERACUNAJ UKUPNU DUZINU
    if (elements.expReportsForm) {
        // dodaj stavku
        elements.addItemButton.addEventListener("click", (e) => {
            e.preventDefault();
            // obriši poruku ako postoji
            deleteMessage();
            let n = document.querySelector("#drumList>div:last-child").dataset
                .next;
            if (n <= 20) {
                addItem(n);
            } else {
                showMessage("Najviše možete da dodate 20 stavki", "error");
            }
        });

        // obrisi stavku
        elements.delItemButton.addEventListener("click", (e) => {
            e.preventDefault();
            // obriši poruku ako postoji
            deleteMessage();
            // obrisi stavku
            delItem();
            // preracunaj ponovo ukupnu duzinu
            updateTotalLength();
        });

        // updejtovanje total length polja prilikom unosa nove duzine
        elements.drumList.addEventListener("input", function () {
            updateTotalLength();
        });
    }

    // SHIFT REPORTS FORMA
    if (elements.shiftReportsForm) {
        // dodaj radnika
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

        // obriši radnika
        elements.removeWorkerButton.addEventListener("click", (e) => {
            e.preventDefault();
            // obriši poruku ako postoji
            deleteMessage();
            // obrisi stavku
            removeWorker();
        });

        // dodaj stavku Dorada
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

        // obriši stavku Dorada
        elements.removeItemDoradaButton.addEventListener("click", (e) => {
            e.preventDefault();
            // obriši poruku ako postoji
            deleteMessage();
            // obrisi stavku
            removeItemDorada();
        });

        // dodaj stavku Proboj
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

        // obriši stavku Proboj
        elements.removeItemProbojButton.addEventListener("click", (e) => {
            e.preventDefault();
            // obriši poruku ako postoji
            deleteMessage();
            // obrisi stavku
            removeItemProboj();
        });
    }

    // Update User Name
    if (elements.updateNameForm) {
        elements.submitName.addEventListener("click", async (e) => {
            e.preventDefault();
            deleteMessage();

            const name = elements.name.value;

            try {
                const user = await updateUserDetail("update", { name });
                showMessage("Korisničko ime uspešno promenjeno.", "success");

                setTimeout(() => {
                    location.assign("/api/v2/auth/me");
                }, 1500);
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // Update User Email
    if (elements.updateEmailForm) {
        elements.submitEmail.addEventListener("click", async (e) => {
            e.preventDefault();
            deleteMessage();

            const email = elements.email.value;

            try {
                const user = await updateUserDetail("update", { email });
                showMessage(
                    "Korisnički email je uspešno promenjen.",
                    "success"
                );

                setTimeout(() => {
                    location.assign("/api/v2/auth/me");
                }, 1500);
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // Update User Password
    if (elements.updatePasswordForm) {
        elements.submitPassword.addEventListener("click", async (e) => {
            e.preventDefault();
            deleteMessage();

            const currentPassword = elements.currentPassword.value;
            const newPassword = elements.newPassword.value;

            try {
                const user = await updateUserDetail("updatepassword", {
                    currentPassword,
                    newPassword,
                });
                // console.log(user);
                showMessage(
                    "Korisnička šifra je uspešno promenjena.",
                    "success"
                );
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // Update User Avatar
    if (elements.updateAvatarForm) {
        // FORMATIRANJE CELE FORME
        elements.avatar.style.opacity = 0;

        elements.avatar.addEventListener("change", () => {
            // dodeli fajl
            const file = elements.avatar.files[0];
            // update UI
            elements.avatarDesc.innerText = `${file.name}  ${returnFileSize(
                file.size
            )}`;
            elements.avatarImg.src = URL.createObjectURL(file);
        });
        // preračunaj veličinu fajla pošto je uvek u B
        const returnFileSize = (number) => {
            if (number < 1024) {
                return number + "bytes";
            } else if (number > 1024 && number < 1048576) {
                return (number / 1024).toFixed(1) + "KB";
            } else if (number > 1048576) {
                return (number / 1048576).toFixed(1) + "MB";
            }
        };

        // SUBMIT BUTTON
        elements.submitAvatar.addEventListener("click", async (e) => {
            e.preventDefault();
            deleteMessage();

            let form = new FormData();
            form.append("avatar", elements.avatar.files[0]);

            try {
                const user = await updateUserDetail("avatar", form);
                showMessage("Profilna slika je uspešno promenjena.", "success");

                setTimeout(() => {
                    location.assign("/api/v2/auth/me");
                }, 1500);
            } catch (error) {
                errorHandler(error);
            }
        });

        // RESTORE BUTTON
        elements.restoreAvatar.addEventListener("click", async (e) => {
            e.preventDefault();
            deleteMessage();

            try {
                const user = await deleteUserAvatar();

                showMessage("Profilna slika je izbrisana.", "success");

                setTimeout(() => {
                    location.assign("/api/v2/auth/me");
                }, 1500);
            } catch (error) {
                errorHandler(error);
            }
        });
    }

    // UPDATE FORGOTTEN PASSWORD

    if (elements.forgottenPasswordForm) {
        elements.submitForgottenPassword.addEventListener(
            "click",
            async (e) => {
                e.preventDefault();
                deleteMessage();

                const password = elements.forgottenPassword.value;
                const currentUrl = window.location.href;

                try {
                    const user = await updateForgottenPassword(
                        currentUrl,
                        password
                    );
                    showMessage(
                        "Šifra je uspešno promenjena. Ulogujte se ponovo.",
                        "success"
                    );
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                } catch (error) {
                    errorHandler(error);
                }
            }
        );
    }

    // PAGINATION CONTROLS
    [
        elements.btnFirstPage,
        elements.btnLastPage,
        elements.btnPrevPage,
        elements.btnMiddlePage,
        elements.btnNextPage,
    ].forEach((elem) => {
        if (elem) {
            elem.addEventListener("click", async function (e) {
                e.preventDefault();
                // iscupaj URL, bropj strane, podataka po strani i broj poslednje strane
                const extractedUrl = elem.dataset.url;
                const path = extractedUrl.includes("dom")
                    ? "dom"
                    : extractedUrl.includes("exp")
                    ? "exp"
                    : "shift";
                const currentPageNumber = extractedUrl.split("page=")[1];
                const lastPageNumber =
                    elements.btnLastPage.dataset.url.split("page=")[1];
                const limit = elements.itemsPerPage.value;

                // pozovi ajax i pokupi podatke za traženu stranu
                const results = await getAdvancedResultsData(extractedUrl);

                // update UI
                // OBRATITI PAZNJU NA TIPOVE PODATAKA - OBAVEZNO PRETVARATI U BROJEVE - BUG
                renderPaginatedUI(
                    results,
                    +currentPageNumber,
                    +limit,
                    +lastPageNumber,
                    path
                );
            });
        }
    });

    //promena broja stavki po strani
    if (elements.itemsPerPage) {
        elements.itemsPerPage.addEventListener("change", async (e) => {
            e.preventDefault();

            const currentUrl = window.location.href;
            const path = currentUrl.includes("dom")
                ? "dom"
                : currentUrl.includes("exp")
                ? "exp"
                : "shift";

            const limit = elements.itemsPerPage.value;
            const url = `/api/v2/reports/${path}/json?limit=${limit}`;

            // pozovi ajax i pokupi podatke za traženu stranu
            const results = await getAdvancedResultsData(url);

            const lastPageNumber = results.data.lastPage;
            const currentPageNumber = 1;

            // update UI
            renderPaginatedUI(
                results,
                currentPageNumber,
                +limit,
                +lastPageNumber,
                path
            );
        });
    }

    // filtriranje naziva svih proizvoda
    if (elements.filterProductName) {
        [
            elements.filterProductName,
            elements.fltByName,
            elements.fltByCode,
        ].forEach((elem) => {
            elem.addEventListener("input", (e) => {
                e.preventDefault();
                const term = elements.filterProductName.value
                    .trim()
                    .toUpperCase();

                let productsArray = Array.from(
                    document.querySelectorAll(".item")
                );
                let counter = 0;

                const searchBy = elements.fltByName.checked ? ".name" : ".code";

                productsArray.forEach((el) => {
                    const name = el.querySelector(searchBy).innerText;

                    if (!name.toUpperCase().includes(term)) {
                        el.classList.add("d-none");
                    } else {
                        el.classList.remove("d-none");
                        counter++;
                    }
                });

                // update counter
                if (counter === 1) {
                    elements.itemsCounter.innerText = `Pronađena je 1 stavka`;
                } else {
                    elements.itemsCounter.innerText = `Pronađene su ${counter} stavke`;
                }
            });
        });
    }
});