// products lista - generisanje jednog proizvoda
import { elements } from "../elementsList";


export const createProductItem = (product, ordNumber) => {
    const item = `
                    <div class="item rounded"><a class="list-group-item list-group-item-action d-flex justify-content-start" href="/api/v2/products/${
                        product.sifra
                    }"><span class="w-25 px-2">${
        ordNumber + 1
    }.</span><span class="w-25 px-2 code">${
        product.sifra
    }</span><span class="w-25 px-2 name">${
        product.proizvod
    }</span><span class="w-25 text-right px-2">${
        product.napon
    }</span><span class="w-25 text-right px-2">${
        product.propis
    }</span></a></div>
                `;

    return item;
};

// dodavanje tog istog proizvoda u listu tj container
export const addItemToParentNode = (item) => {
    elements.productsListContainer.insertAdjacentHTML("beforeend", item);
};

// update ukupan broj pronadjenih itemsa tj proizvoda
export const updateNoOfItems = (num) => {
    let text =
        num > 1
            ? `Pronađene su ${num} stavke.`
            : num === 1
            ? `Pronađena je ${num} stavka.`
            : "Nije pronađena nijedna stavka.";

    elements.itemsCounter.innerText = text;
};
