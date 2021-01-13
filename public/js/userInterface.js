export const elements = {
    
    productCode : document.getElementById('productCode'),
    updateProductCode: document.getElementById('updateProductCode'),
    // butons on Reports forms
    saveButton: document.getElementById('save'),
    savePDFButton: document.getElementById('savePDF'),
    saveUpdateButton: document.getElementById('saveProductUpdate'),
    // forms
    productHandleForm: document.getElementById('productHandleForm'),
    expReportsForm : document.getElementById('expReportsForm'),
    shiftReportsForm : document.getElementById('shiftReportsForm'),
    // product properies
    cableType: document.getElementById('cableType'),
    ratedVoltage: document.getElementById('ratedVoltage'),
    standard: document.getElementById('standard'),
    productColor: document.getElementById('productColor'),
    wiresNumber: document.getElementById('wiresNumber'),
    wireDiametar: document.getElementById('wireDiametar'),
    resistance: document.getElementById('resistance'),
    semiFirst: document.getElementById('semiFirst'),
    thickInsulation: document.getElementById('thickInsulation'),
    semiSecond: document.getElementById('semiSecond'),
    thickSheath: document.getElementById('thickSheath'),
    outerDiametar: document.getElementById('outerDiametar'),
    testVoltage: document.getElementById('testVoltage'),
    testTime: document.getElementById('testTime'),
    pDischarge: document.getElementById('pDischarge'),
    // exp Reports
    drumList: document.getElementById('drumList'),
    addItemButton: document.getElementById('addItem'),
    delItemButton: document.getElementById('delItem'),
    totalLength : document.querySelector('#totalLength'),
    // shift Reports
    workersList: document.getElementById('workersList'),
    doradaList: document.getElementById('doradaList'),
    probojList: document.getElementById('probojList'),
    addWorkerButton: document.getElementById('addWorker'),
    removeWorkerButton: document.getElementById('removeWorker'),
    addItemDoradaButton: document.getElementById('addItemDorada'),
    removeItemDoradaButton: document.getElementById('removeItemDorada'),
    addItemProbojButton: document.getElementById('addItemProboj'),
    removeItemProbojButton: document.getElementById('removeItemProboj'),
    // index.html / index-eng.html
    domesticForm : document.getElementById('domesticForm'),
    workOrder : document.getElementById('workOrder'),
    misNumber : document.getElementById('misNumber'),
    leng : document.getElementById('length'),
    bruto : document.getElementById('bruto'),
    neto : document.getElementById('neto'),
    // ino.html / ino-eng.html
    yearManufacture : document.getElementById('yearManufacture'),

    // login / registration
    authForm: document.getElementById('authForm'),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    password2: document.getElementById('password2'),
    // togglePassword: document.getElementById('togglePassword'),

    // user panel
    updateNameForm: document.getElementById('updateName'),
    updateEmailForm: document.getElementById('updateEmail'),
    updatePasswordForm: document.getElementById('updatePassword'),
    updateAvatarForm: document.getElementById('updateAvatar'),

    submitName: document.getElementById('submitName'),
    submitEmail: document.getElementById('submitEmail'),
    submitPassword: document.getElementById('submitPassword'),
    submitAvatar: document.getElementById('submitAvatar'),
    restoreAvatar: document.getElementById('defaultAvatar'),

    currentPassword: document.getElementById('currentPassword'),
    newPassword: document.getElementById('newPassword'),
    avatar: document.getElementById('avatar'),
    avatarImg: document.getElementById('avatarImg'),
    avatarDesc: document.getElementById('avatarDesc'),

    // forgotten password form
    forgottenPasswordForm: document.getElementById('forgottenPassword'),
    forgottenPassword: document.getElementById('forgottenPasswordInput'),
    submitForgottenPassword: document.getElementById('submitForgottenPassword'),  
    
    // pagination elements
    pageItemsContainer: document.getElementById('pageItemsContainer'),
    btnFirstPage: document.getElementById('btnFirstPage'),
    btnLastPage: document.getElementById('btnLastPage'),
    btnPrevPage: document.getElementById('btnPrevPage'),
    btnMiddlePage: document.getElementById('btnMiddlePage'),
    btnNextPage: document.getElementById('btnNextPage'),
    firstPage: document.getElementById('firstPage'),
    lastPage: document.getElementById('lastPage'),
    prevPage: document.getElementById('prevPage'),
    middlePage: document.getElementById('middlePage'),
    nextPage: document.getElementById('nextPage'),
    leftDots: document.getElementById('leftDots'),
    rightDots: document.getElementById('rightDots'),
    itemsPerPage: document.getElementById('itemsPerPage'),

    // filtriranje svih proizvoda
    filterProductName: document.getElementById('filterProductName'),
    itemsCounter: document.getElementById('itemsCounter'),
    fltByName: document.getElementById('fltByName'),
    fltByCode: document.getElementById('fltByCode')

};

export const updateReportsUI = (elem) => {
    
        if (elem) {

        elements.cableType.innerText = elem.proizvod || "/";
        elements.ratedVoltage.innerText = elem.napon || "/";
        elements.standard.innerText = elem.propis || "/";
        // boja postoji samo u exp Reports, ne u dom Reports
        if (elements.productColor) {
            elements.productColor.innerText = elem.boja || "/";
        }
        elements.wiresNumber.innerText = elem.brojZica || "/";
        elements.wireDiametar.innerText = elem.precnikZice || "/";
        elements.resistance.innerText = elem.otpor || "/";
        elements.semiFirst.innerText = elem.debPPS1 || "/";
        elements.thickInsulation.innerText = elem.debIzolacije || "/";
        elements.semiSecond.innerText = elem.debPPS2 || "/";
        elements.thickSheath.innerText = elem.debPlasta || "/";
        elements.outerDiametar.innerText = elem.spPrecnik || "/";
        elements.testVoltage.innerText = elem.ispitniNapon || "/";
        elements.testTime.innerText = elem.proizvod.toLowerCase().startsWith('fr') ? '15 min' : '5 min' || '5 min';
        elements.pDischarge.innerText = elem.parcijalna.replace('&lt;', '<') || "/";
    } else {
        elements.cableType.innerText = "/";
        elements.ratedVoltage.innerText =  "/";
        elements.standard.innerText = "/";
        // jedino boja postoji samo u index.html / index-ino.html
        if (elements.productColor) {
            elements.productColor.innerText = "/";
        }
        elements.wiresNumber.innerText = "/";
        elements.wireDiametar.innerText = "/";
        elements.resistance.innerText = "/";
        elements.semiFirst.innerText = "/";
        elements.thickInsulation.innerText = "/";
        elements.semiSecond.innerText = "/";
        elements.thickSheath.innerText = "/";
        elements.outerDiametar.innerText = "/";
        elements.testVoltage.innerText = "/";
        elements.testTime.innerText = '5min';
        elements.pDischarge.innerText = "/";
    }
};


export const updateProductUI = (elem) => {
    
    if (elem) {

        elements.cableType.value = elem.proizvod || "/";
        elements.ratedVoltage.value = elem.napon || "/";
        elements.standard.value = elem.propis || "/";
        elements.productColor.value = elem.boja || "/";
        elements.wiresNumber.value = elem.brojZica || "/";
        elements.wireDiametar.value = elem.precnikZice || "/";
        elements.resistance.value = elem.otpor || "/";
        elements.semiFirst.value = elem.debPPS1 || "/";
        elements.thickInsulation.value = elem.debIzolacije || "/";
        elements.semiSecond.value = elem.debPPS2 || "/";
        elements.thickSheath.value = elem.debPlasta || "/";
        elements.outerDiametar.value = elem.spPrecnik || "/";
        elements.testVoltage.value = elem.ispitniNapon || "/";
        elements.pDischarge.value = elem.parcijalna.replace('&lt;', '<') || "/";
    } else {
        elements.cableType.value = "/";
        elements.ratedVoltage.value =  "0.6/1kV";
        elements.standard.value = "/";
        elements.productColor.value = "crna";
        elements.wiresNumber.value = "/";
        elements.wireDiametar.value = "/";
        elements.resistance.value = "/";
        elements.semiFirst.value = "/";
        elements.thickInsulation.value = "/";
        elements.semiSecond.value = "/";
        elements.thickSheath.value = "/";
        elements.outerDiametar.value = "/";
        elements.testVoltage.value = "3.5";
        elements.pDischarge.value = "/";
    }
};
// dodaj stavku u exp reports
export const addItem = (n) => {
    
    const elem = `<div class="row mb-2 marker" data-next=${+n + 1}><div class="col-6"><input class="form-control text-right font-weight-bold item" type="text" name="dobos_${n}"  value='/' placeholder='broj dobosa'><small>Error message</small></div><div class="col-6 input-group"><input class="form-control text-right font-weight-bold" type="number" name="duzina_${n}"  value=0 placeholder='/'><div class="input-group-append"><span class="input-group-text">m</span></div></div></div>`;

    elements.drumList.insertAdjacentHTML('beforeend', elem);
};
// obrisi stavku u exp reports
export const delItem = () => {
    const elem = document.querySelector('#drumList .marker:last-child');
        if (elem) {
            elem.parentNode.removeChild(elem);
            //totalLength.textContent = calcTotalLength();
        }
};

// exp Reports - preracunaj total length nakon keyup eventa
export const updateTotalLength = () => {
    let arr = Array.from(document.querySelectorAll('#drumList input[type="number"]'));

    elements.totalLength.value = calcTotalLength(arr);    
};

// preracun total polja nakon dodaj / oduzmi item
function calcTotalLength(arr) {
    
    return arr.reduce((acc, el) => {
        acc += el.valueAsNumber;
        return acc;
    }, 0);
} 

// dodaj radnika u shift Reports
export const addWorker = (n) => {
    const elem = `<tr class="marker" data-next=${+n + 1}><th class="align-middle w-25" scope="row"><select class="form-control mb-1" name="radnik${n}_ime"><option value="M. Vučković">M. Vučković</option><option value="B. Marković">B. Marković</option><option value="D. Aranđelović">D. Aranđelović</option><option value="A. Dimitrijević">A. Dimitrijević</option><option value="V. Nešković">V. Nešković</option><option value="G. Jovanović">G. Jovanović</option><option value="G. Pavlović">G. Pavlović</option><option value="M. Lilić">M. Lilić</option><option value="D. Đorđević">D. Đorđević</option><option value="M. Nikolić">M. Nikolić</option><option value="D. Rudović">D. Rudović</option></select><div class="d-flex flex-row"><input class="form-control col-4" type="number" placeholder="K" name="radnik${n}_k"><input class="form-control col-4" type="number" placeholder="R" name="radnik${n}_r"><input class="form-control col-4" type="number" placeholder="D" name="radnik${n}_d"></div></th><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="radnik${n}_vreme"></td><td class="align-middle" colspan="11"><textarea class="form-control" cols="30" rows="2" placeholder="napomena..." name="radnik${n}_nap"></textarea></td></tr>`;

    elements.workersList.insertAdjacentHTML('beforeend', elem);
};

// obriši radnika u shift Reports
export const removeWorker = () => {
    const elem = document.querySelector('#workersList .marker:last-child');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
};

// dodaj stavku Dorada u shift Reports
export const addItemDorada = (n) => {
    const elem = `<tr class="marker" data-next=${+n + 1}><th class="align-middle w-25" scope="row">Dorada</th><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="dorada${n}_rn"></td><td class="align-middle"><input class="form-control" type="text" placeholder="/" name="dorada${n}_proizvod"></td><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="dorada${n}_duz"></td><td class="align-middle"><input class="form-control" type="text" placeholder="/" name="dorada${n}_nap"></td></tr>`;

    elements.doradaList.insertAdjacentHTML('beforeend', elem);
};

// obriši stavku Dorada u shift Reports
export const removeItemDorada = () => {
    const elem = document.querySelector('#doradaList .marker:last-child');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
};

// dodaj stavku Proboj u shift Reports
export const addItemProboj = (n) => {
    const elem = `<tr class="marker" data-next=${+n + 1}><th class="align-middle w-25" scope="row">Proboj</th><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="proboj${n}_rn"></td><td class="align-middle"><input class="form-control pedeset" type="text" placeholder="/" name="proboj${n}_proizvod"></td><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="proboj${n}_duz"></td><td class="align-middle"><input class="form-control" type="text" placeholder="/" name="proboj${n}_nap"></td></tr>`;

    elements.probojList.insertAdjacentHTML('beforeend', elem);
};

// obriši stavku Proboj u shift Reports
export const removeItemProboj = () => {
    const elem = document.querySelector('#probojList .marker:last-child');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
};

// paginacija, render UI, prikazivanje rezultata strane i dodeljivanje novih adresa buttonima
export const renderPaginatedUI = (input, currentPage, limit, lastPage, type) => {
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