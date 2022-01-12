import { elements } from "../elementsList";


// paginacija, render UI, prikazivanje rezultata strane i dodeljivanje novih adresa buttonima
export const renderPaginatedView = (input, currentPage, limit, lastPage, type) => {
    let productsArray = input.data.data;

    // update kontejner listu
    elements.pageItemsContainer.innerHTML = '';

    productsArray.forEach((elem, ind) => {

        let no = (currentPage - 1) * limit + ind + 1;

        let markup;

        if (type === 'dom') {
            markup = `<a class="list-group-item list-group-item-action d-flex justify-content-between" href="/api/v2/reports/dom?id=${elem.MISBroj}"><span class="w-25 px-2">${no}.</span><span class="w-25 px-2">MIS Broj: ${elem.MISBroj}</span><span class="w-25 px-2">Nalog: ${elem.radniNalog}</span><span class="w-25 px-2">${elem.proizvod.proizvod}</span><span class="w-25 text-right px-2">${elem.proizvod.napon}</span><span class="w-25 text-right px-2">${elem.duzina}m</span></a>`;

        } else if (type === 'exp'){
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            markup = `<a class="list-group-item list-group-item-action d-flex justify-content-between" href="/api/v2/reports/exp?id=${elem._id}"><span class="w-25 px-2">${no}.</span><span class="w-25 px-2">${elem.proizvod.proizvod}</span><span class="w-25 px-2">Ukupna duzina: ${elem.ukupnaDuz}m</span><span class="w-25 px-2">Kreiran: ${elem.createdAt.toLocaleString('sr-sr', options)}</span></a>`;
        } else {
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            markup = `<a class="list-group-item list-group-item-action d-flex justify-content-between" href="/api/v2/reports/shift/${elem._id}"><span class="w-25 px-2">${no}</span><span class="w-25 px-2">Kreiran: ${elem.createdAt.toLocaleString('sr-sr', options)}</span><span class="w-25 px-2">Smena: ${elem.smena}</span><span class="w-25 px-2">Kontrolor: ${elem.createdByUser.name}</span></a>`;
        }
        
    
        elements.pageItemsContainer.insertAdjacentHTML('beforeend', markup);
    })

    // update buttons
    updateButtons(currentPage, lastPage, limit, type);
}

// pagination buttons logic
const updateButtons = (current, last, itmPerPage, typeOfReport) => {
    // skini klasu disabled elementu ako je ima
    [elements.firstPage, elements.lastPage, elements.prevPage, elements.middlePage, elements.nextPage].forEach(elem => {
        if (elem && elem.classList.contains('disabled')) {
            // console.log(`elem ${elem.toString()} ima klasu disabled`);
            elem.classList.remove('disabled');
            
        } 
    })
    
    // PROVERI BUTTON FIRST
    elements.btnFirstPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=1`;
    if (current == 1) {
        elements.firstPage.classList.add('disabled');

    } else {
        elements.firstPage.classList.remove('disabled');
    }

    // PROVERI TACKE LEVO
    if (current > 2 && last != 1 && last != 2 && last != 3) {
        elements.leftDots.classList.remove('d-none');

    } else {
        elements.leftDots.classList.add('d-none');
    }

    // PROVERI BUTTON PREVIOUS
    if ( current > 1 && current < last) {

        elements.btnPrevPage.innerText = current - 1;
        elements.btnPrevPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current - 1}`;

    } else if (current == 1 && last == 1) {
        elements.btnPrevPage.innerText = current;
        elements.btnPrevPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current}`;
        elements.prevPage.classList.add('disabled');

    } else if (current == last && last != 2) {
        elements.btnPrevPage.innerText = current - 2;
        elements.btnPrevPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current - 2}`;

    } else if (current == 2 && last == 2) {
        elements.btnPrevPage.innerText = current - 1;
        elements.btnPrevPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current - 1}`;

    } else {
        elements.btnPrevPage.innerText = 1;
        elements.btnPrevPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=1`;
        elements.firstPage.classList.add('disabled');
        elements.prevPage.classList.add('disabled');
    }

    // PROVERI BUTTON MIDDLE
    // provera prvo da li je button d-none
    if (elements.middlePage) {
        if (elements.middlePage.classList.contains('d-none')) {
            elements.middlePage.classList.remove('d-none');
        }

        if (current == 1) {
            elements.middlePage.classList.remove('disabled');
            elements.btnMiddlePage.innerText = current + 1;
            elements.btnMiddlePage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current + 1}`;

        } else if (current >= last && last != 2) {
            elements.btnMiddlePage.innerText = current - 1;
            elements.btnMiddlePage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current - 1}`;
        } else {

            elements.middlePage.classList.add('disabled');
            elements.btnMiddlePage.innerText = current;
            elements.btnMiddlePage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current}`;
        }

        // ako ima 1 stranu, disable Middle
        if ( last == 1 ) {
            elements.middlePage.classList.add('d-none');
        }
    }

    // PROVERI BUTTON NEXT
    // provera prvo da li je button d-none
    if (elements.btnNextPage) {
        
        if (elements.nextPage.classList.contains('d-none')) {
            elements.nextPage.classList.remove('d-none');
        }

        if ( current == 1) {
            elements.btnNextPage.innerText = current +2;
            elements.btnNextPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current + 2}`;
        } else if (current < last) {
            elements.btnNextPage.innerText = current + 1;
            elements.btnNextPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${current + 1}`;
            
        } else {
            elements.btnNextPage.innerText = last;
            elements.btnNextPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${last}`;
            elements.lastPage.classList.add('disabled');
            elements.nextPage.classList.add('disabled');
        }

        // ako ima 1 stranu, disable Next
        if ( last == 1 || last == 2 ) {
            elements.nextPage.classList.add('d-none');
        }
    }

    // PROVERI TACKE DESNO
    if (current > last - 1 || last == 2 || last == 1 || last == 3) {
        elements.rightDots.classList.add('d-none');

    } else {
        elements.rightDots.classList.remove('d-none');
    }

    // proveri buton LAST
    elements.btnLastPage.dataset.url = `/api/v2/reports/${typeOfReport}/json?limit=${itmPerPage}&page=${last}`;

    if (current == last) {
        elements.lastPage.classList.add('disabled');

    } else {
        elements.lastPage.classList.remove('disabled');
    }
}