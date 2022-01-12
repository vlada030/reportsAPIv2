import { elements } from "../elementsList";

// dodaj radnika u shift Reports
export const addWorker = (n) => {
    const elem = `<tr class="marker" data-next=${+n + 1}><th class="align-middle w-25" scope="row"><select class="form-control mb-1" name="radnik${n}_ime"><option value="D. Aranđelović">D. Aranđelović</option><option value="A. Dimitrijević">A. Dimitrijević</option><option value="M. Lilić">M. Lilić</option><option value="G. Jovanović">G. Jovanović</option><option value="G. Pavlović">G. Pavlović</option><option value="D. Đorđević">D. Đorđević</option><option value="D. Rudović">D. Rudović</option></select><div class="d-flex flex-row"><input class="form-control col-4" type="number" placeholder="K" name="radnik${n}_k"><input class="form-control col-4" type="number" placeholder="R" name="radnik${n}_r"><input class="form-control col-4" type="number" placeholder="D" name="radnik${n}_d"></div></th><td class="align-middle"><input class="form-control" type="number" placeholder="/" name="radnik${n}_vreme"></td><td class="align-middle" colspan="11"><textarea class="form-control" cols="30" rows="2" placeholder="napomena..." name="radnik${n}_nap"></textarea></td></tr>`;

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
