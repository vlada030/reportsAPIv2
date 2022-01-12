import { elements } from "../elementsList";
import { deleteMessage, showMessage } from "./alertMessagesHandler";
import errorHandler from "./errorHandler";
import { getProduct, updateProduct } from "./ajaxRequestsHandler";
import {updateProductUI} from '../handleUIElements/handleProductUIElements'

export const initializeUpdateProductPage = () => {
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
            const product = await getProduct(updateProductCode.value.trim());
            if (product) {
                // AKO POSTOJI PROIZVOD UPDATE UI
                // console.log(product.data.data[0])
                updateProductUI(product.data.data[0]);
            }
        } catch (error) {
            errorHandler(error);
        }
    });
};

export const sendUpdateProductRequest = () => {
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
                    location.assign("/api/v2/products/update");
                }, 1000);
            }
        } catch (error) {
            errorHandler(error);
        }
    });
}
