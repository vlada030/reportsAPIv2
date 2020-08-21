const elements = {
    // zajednicki elementi
    // logovanje
    optionsNav: document.getElementById('optionsNav'),
    userNav: document.getElementById('userNav'),
    logoutButton: document.getElementById('logoutBtn'),

    productCode : document.getElementById('productCode'),
    ordinalNumber: document.getElementById('ordinalNumber'),
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
    pDischarge: document.getElementById('pDischarge'),
    // index.html / index-eng.html
    domesticForm : document.getElementById('domesticForm'),
    workOrder : document.getElementById('workOrder'),
    misNumber : document.getElementById('misNumber'),
    leng : document.getElementById('length'),
    bruto : document.getElementById('bruto'),
    neto : document.getElementById('neto'),
    // ino.html / ino-eng.html
    inoForm : document.getElementById('inoForm'),
    yearManufacture : document.getElementById('yearManufacture'),
    totalLength : document.querySelector('#totalLength'),
    drumList: document.getElementById('drumList'),
    addItemButton: document.getElementById('addItemButton'),
    delItemButton: document.getElementById('delItemButton'),
    // product-update.html
    productUpdateForm: document.getElementById('productUpdateForm'),
    deleteProductButton: document.getElementById('deleteProduct'),
    // product-create.html
    productCreateForm: document.getElementById('productCreateForm'),
    // login.html / registration.html
    authForm: document.getElementById('authForm'),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    password2: document.getElementById('password2')
};

export const updateReportsUI = (elem) => {
    
        if (elem) {

        elements.cableType.innerText = elem.proizvod || "/";
        elements.ratedVoltage.innerText = elem.napon || "/";
        elements.standard.innerText = elem.propis || "/";
        // jedino boja postoji samo u index.html / index-ino.html
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
        elements.pDischarge.innerText = elem.parcijalna || "/";
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
        elements.pDischarge.innerText = "/";
    }
};