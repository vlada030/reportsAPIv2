// bez ovoga ne radi npr async/await... i blokira celu app
import '@babel/polyfill';
import {getProduct, updateProduct, deleteReport} from './ajaxRequests';
import errorHandler from './errorHandler';
import {showMessage, deleteMessage} from './alertMessage';
import {updateReportsUI, updateProductUI} from './userInterface';

// 
const productCode = document.getElementById('productCode');
const updateProductCode = document.getElementById('updateProductCode');
const saveButton = document.getElementById('save');
const savePDFButton = document.getElementById('savePDF');

// provera da li postoji proizvod sa zadatom šifrom dom/exp Reports
if (productCode) {
    productCode.addEventListener('input', async (e) => {
        e.preventDefault();
        try {
            // 1. proveri početno stanje
            // obriši alert poruku ako je ima
            deleteMessage();
            // uradi update product polja
            updateReportsUI(void 0);
            // proveri button SAVE / PDF da li su disabled
            saveButton.removeAttribute('disabled');
            savePDFButton.removeAttribute('disabled');

            // NE PRAVI NEPOTREBAN ZAHTEV AKO SIFRA NIJE DUŽINE 7
            if (productCode.value.trim().length !== 7) {
                // blokiraj SAVE button
                saveButton.setAttribute('disabled', 'true');
                savePDFButton.setAttribute('disabled', 'true');
                throw new Error('Šifra proizvoda se sastoji iz 7 cifara');
            }
            console.log(productCode.value);
            const product = await getProduct(productCode.value.trim());
            console.log(product)
            if (product) {
                // AKO POSTOJI PROIZVOD UPDATE UI
                console.log(product.data.data[0])
                updateReportsUI(product.data.data[0]);    
            } 
            
        } catch (error) {
            errorHandler(error);
        }       
    });
}
// provera da li postoji proizvod sa zadatom šifrom prilikom updajta proizvoda
if (updateProductCode) {
    updateProductCode.addEventListener('input', async (e) => {
        e.preventDefault();
        try {
            // 1. proveri početno stanje
            // obriši alert poruku ako je ima
            deleteMessage();
            // uradi update product polja
            updateProductUI(void 0);
            // proveri button SAVE / PDF da li su disabled
            saveButton.removeAttribute('disabled');

            // NE PRAVI NEPOTREBAN ZAHTEV AKO SIFRA NIJE DUŽINE 7
            if (updateProductCode.value.trim().length !== 7) {
                // blokiraj SAVE button
                saveButton.setAttribute('disabled', 'true');
                throw new Error('Šifra proizvoda se sastoji iz 7 cifara');
            }
            console.log(updateProductCode.value);
            const product = await getProduct(updateProductCode.value.trim());
            if (product) {
                // AKO POSTOJI PROIZVOD UPDATE UI
                console.log(product.data.data[0])
                updateProductUI(product.data.data[0]);    
            } 
            
        } catch (error) {
            errorHandler(error);
        }       
    });
}

// ZATVORI INFO PROZOR / MODAL...
window.addEventListener('click', (e) => {
    if (e.target.matches('.close')) {
        deleteMessage();
    }
})

// RESETUJ POLJA DOMREPORT FORME
const resetDomReportsForm = () => {
    document.getElementById('sifra').value = '';
    document.getElementById('radniNalog').value = '';
    document.getElementById('MISBroj').value = '';
    document.getElementById('duzina').value = '';
    document.getElementById('neto').value = '';
    document.getElementById('bruto').value = '';
}


// OBRIŠI DOMREPORT IZ BAZE
window.addEventListener('click', (e) => {
    // kada je klinkuto dugme Obriši na modalu
    if (e.target.matches('#eraseReport')) {
        try {
            const eraseID = e.target;
            console.log(eraseID.dataset.reportid);
            deleteReport(eraseID.dataset.reportid);
            showMessage('Izveštaj je uspešno obrisan.', 'success');
            window.setTimeout(() => {
                location.assign('/api/v2/reports/dom');                
            }, 2000)
            
        } catch (error) {
            errorHandler(error);
        }
    }
})

// POŠALJI PUT REQUEST ZA UPDATE PROIZVODA
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    let data = {};
    let formData = Array.from(document.getElementById("productHandleForm").elements);
    console.log(formData);
    formData.forEach(el => {
        if (el.getAttribute('type') !== 'hidden' && el.tagName.toLowerCase() !== 'button') {
            data[el.name] = el.value;
        }        
    })
    console.log(data);
    updateProduct(data.sifra, data);
})