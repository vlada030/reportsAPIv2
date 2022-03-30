import { elements } from "../elementsList";
import { fixNumberOfDecPlaces, isNotNumericValue } from "../utils";

export const updateReportsUI = (elem) => {
    if (elem) {
        elements.cableType.innerText = elem.proizvod || "/";
        elements.ratedVoltage.innerText = elem.napon || "/";
        elements.standard.innerText = elem.propis || "/";
        // boja postoji samo u dom Reports, ne u exp Reports
        if (elements.productColor) {
            elements.productColor.innerText = elem.boja.toUpperCase() || "/";
        }
        elements.wiresNumber.innerText = elem.brojZica || "/";
        elements.wireDiametar.innerText =
            fixNumberOfDecPlaces(elem.precnikZice) || "/";
        elements.resistance.innerText =
            fixNumberOfDecPlaces(elem.otpor, 3) || "/";
        elements.semiFirst.innerText = isNotNumericValue(elem.debPPS1) ? "/" : fixNumberOfDecPlaces(elem.debPPS1);
        elements.thickInsulation.innerText =
            fixNumberOfDecPlaces(elem.debIzolacije) || "/";
        elements.semiSecond.innerText = isNotNumericValue(elem.debPPS2) ? "/" : fixNumberOfDecPlaces(elem.debPPS2);
        elements.thickSheath.innerText = isNotNumericValue(elem.debPlasta) ? "/" : fixNumberOfDecPlaces(elem.debPlasta);
        elements.outerDiametar.innerText =
            fixNumberOfDecPlaces(elem.spPrecnik) || "/";
        elements.testVoltage.innerText = elem.ispitniNapon || "/";
        elements.testTime.innerText = elem.proizvod
            .toLowerCase()
            .startsWith("fr")
            ? "15 min"
            : "5 min" || "5 min";
        elements.pDischarge.innerText =
            elem.parcijalna.replace("&lt;", "<") || "/";
    } else {
        elements.cableType.innerText = "/";
        elements.ratedVoltage.innerText = "/";
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
        elements.testTime.innerText = "5min";
        elements.pDischarge.innerText = "/";
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
