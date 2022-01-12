import { elements } from "../elementsList";

// create / update product
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
        elements.pDischarge.value = elem.parcijalna.replace("&lt;", "<") || "/";
    } else {
        elements.cableType.value = "/";
        elements.ratedVoltage.value = "0.6/1kV";
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
