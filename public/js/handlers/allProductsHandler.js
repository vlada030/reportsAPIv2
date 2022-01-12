import {getAdvancedResultsData} from './ajaxRequestsHandler'
import {elements} from '../elementsList'
import {splitArray, debounce} from '../utils'
import {createProductItem, addItemToParentNode, updateNoOfItems} from '../handleUIElements/handleAllProductsUIElements'

export const manageProductsList = async () => {
            
            function loadMoreItems(arr) {
                // preko closures hvata sledeci index
                let index = 1;
                // da inc index samo u slucaju kada scrollujemo unapred NE UNAZAD
                let previousScrollTop = 0;

                return () => {
                    if (index < arr.length) {
                        const { scrollTop, scrollHeight, clientHeight } =
                            document.documentElement;

                        if (
                            scrollTop + clientHeight >= scrollHeight - 100 &&
                            scrollTop > previousScrollTop
                        ) {
                            //console.log({ index, arr });
                            // inicijalna strana 0 ucitana u startu zato krece od 1 i treba da ide do broja subarraya arr
                            arr[index].forEach((product, ind) => {
                                const item = createProductItem(
                                    product,
                                    index * itemsPerLoad + ind
                                );
                                addItemToParentNode(item);
                            });

                            index++;
                            previousScrollTop = scrollTop;
                        }
                    }
                };
            }

            let itemsPerLoad = 20;

            // pomocna promenjiva koja drzi referencu ka upotrebljenoj funkciji u event listeneru radi njegovog kasnijeg remove
            let referenceToFunction;

            let { data: productsList } = await getAdvancedResultsData(
                "/api/v2/products"
            );

            // podeli ceo array na subarraye tj "strane"
            const splittedProductsList = splitArray(
                productsList.data,
                itemsPerLoad
            );

            // inicijalno prikazivanje - prvih 20
            splittedProductsList[0].forEach((product, ind) => {
                const item = createProductItem(product, ind);
                addItemToParentNode(item);
            });

            // prikazi ukupan broj proizvoda
            updateNoOfItems(productsList.data.length);

            // pozovi infinite scroll sa auto index incrementom preko closures
            const loadMoreItemsClosures = loadMoreItems(splittedProductsList);
            // ovo je dodatno da bi se formirala referenca koja ce biti upotrebljena kasnije za removeEventListener
            referenceToFunction = debounce(loadMoreItemsClosures, 500);
            window.addEventListener("scroll", referenceToFunction);

            // filtriranje proizvoda preko 3 input elementa
            [
                elements.filterTerm,
                elements.fltByName,
                elements.fltByCode,
            ].forEach((element) => {
                element.addEventListener("input", (e) => {
                    // skloni postojeci scroll event listener
                    window.removeEventListener("scroll", referenceToFunction);

                    let filteredProducts = [];

                    const isCheckedSearchByName = elements.fltByName.checked;
                    const isCheckedSearchByCode = elements.fltByCode.checked;

                    if (isCheckedSearchByName) {
                        filteredProducts = productsList.data.filter(
                            (product) => {
                                return product.proizvod.toUpperCase().includes(
                                    elements.filterTerm.value
                                        .trim()
                                        .toUpperCase()
                                );
                            }
                        );
                    }

                    if (isCheckedSearchByCode) {
                        filteredProducts = productsList.data.filter(
                            (product) => {
                                return product.sifra
                                    .toString()
                                    .startsWith(
                                        elements.filterTerm.value.trim()
                                    );
                            }
                        );
                    }

                    // proveri da li nakon filtriranja ima nesto za prikaz
                    if (filteredProducts.length === 0) {
                        updateNoOfItems(0);
                        elements.productsListContainer.innerHTML = "";
                        return;
                    }

                    // podeli ceo array na subarraye tj "strane"
                    const filteredSplittedProductsList = splitArray(
                        filteredProducts,
                        itemsPerLoad
                    );

                    // isprazni parent container
                    elements.productsListContainer.innerHTML = "";

                    // inicijalno prikazivanje - prvih 20
                    filteredSplittedProductsList[0].forEach((product, ind) => {
                        const item = createProductItem(product, ind);
                        addItemToParentNode(item);
                    });

                    // prikazi ukupan broj proizvoda
                    updateNoOfItems(filteredProducts.length);

                    // pozovi infinite scroll sa auto index incrementom preko closures
                    const loadMoreFilteredItemsClosures = loadMoreItems(
                        filteredSplittedProductsList
                    );

                    // ovo je dodatno da bi se formirala referenca koja ce biti upotrebljena kasnije za removeEventListener
                    referenceToFunction = debounce(
                        loadMoreFilteredItemsClosures,
                        500
                    );

                    window.addEventListener("scroll", referenceToFunction);
                });
            });
}


// prvobitni nacin gde se lista generisala na serveru pa se na frontu filtriranjem dodavala klasa sa display-none elementima
// [
        //     elements.filterTerm,
        //     elements.fltByName,
        //     elements.fltByCode,
        // ].forEach((elem) => {
        //     elem.addEventListener("input", (e) => {
        //         e.preventDefault();
        //         const term = elements.filterTerm.value
        //             .trim()
        //             .toUpperCase();

        //         let productsArray = Array.from(
        //             document.querySelectorAll(".item")
        //         );
        //         let counter = 0;

        //         const searchBy = elements.fltByName.checked ? ".name" : ".code";

        //         productsArray.forEach((el) => {
        //             const name = el.querySelector(searchBy).innerText;

        //             if (!name.toUpperCase().includes(term)) {
        //                 el.classList.add("d-none");
        //             } else {
        //                 el.classList.remove("d-none");
        //                 counter++;
        //             }
        //         });

        //         // update counter
        //         if (counter === 1) {
        //             elements.itemsCounter.innerText = `Pronađena je 1 stavka`;
        //         } else {
        //             elements.itemsCounter.innerText = `Pronađene su ${counter} stavke`;
        //         }
        //     });
        // });
