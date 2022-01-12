import { elements } from "../elementsList";
import { getAdvancedResultsData } from "./ajaxRequestsHandler";
import { renderPaginatedView } from "../handleUIElements/handlePaginationUIElements";

export const renderPagesAndUI = () => {
    // dodaj evente na sve buttone koji se koriste prilikom listanja proizvoda
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
                const currentPageNumber = parseInt(
                    extractedUrl.split("page=")[1]
                );
                const lastPageNumber = parseInt(
                    elements.btnLastPage.dataset.url.split("page=")[1]
                );
                const limit = parseInt(elements.itemsPerPage.value);

                // pozovi ajax i pokupi podatke za traženu stranu
                const results = await getAdvancedResultsData(extractedUrl);

                // update UI
                // OBRATITI PAZNJU NA TIPOVE PODATAKA - OBAVEZNO PRETVARATI U BROJEVE - BUG
                renderPaginatedView(
                    results,
                    currentPageNumber,
                    limit,
                    lastPageNumber,
                    path
                );
            });
        }
    });

    // odabir broja stavki po strani
    if (elements.itemsPerPage) {
        elements.itemsPerPage.addEventListener("change", async (e) => {
            e.preventDefault();

            const currentUrl = window.location.href;
            const path = currentUrl.includes("dom")
                ? "dom"
                : currentUrl.includes("exp")
                ? "exp"
                : "shift";

            const limit = parseInt(elements.itemsPerPage.value);
            const url = `/api/v2/reports/${path}/json?limit=${limit}`;

            // pozovi ajax i pokupi podatke za traženu stranu
            const results = await getAdvancedResultsData(url);

            const lastPageNumber = parseInt(results.data.lastPage);
            const currentPageNumber = 1;

            // update UI
            renderPaginatedView(
                results,
                currentPageNumber,
                limit,
                lastPageNumber,
                path
            );
        });
    }
};
