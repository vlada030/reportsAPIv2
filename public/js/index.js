// bez ovoga ne radi npr async/await... i blokira celu app
import '@babel/polyfill';
import {getProduct} from './ajaxRequests';
import errorHandler from './errorHandler';
import {showMessage, deleteMessage} from './alertMessage';
import {updateReportsUI} from './userInterface';

const productCode = document.getElementById('productCode');

if (productCode) {
    productCode.addEventListener('input', async (e) => {
        e.preventDefault();
        try {
            // 1. proveri početno stanje
            // obriši alert poruku ako je ima
            deleteMessage();
            // uradi update product polja
            updateReportsUI(void 0);

            if (productCode.value.trim().length !== 7) {
                throw new Error('Šifra proizvoda se sastoji iz 7 cifara')
            }
            console.log(productCode.value);
            const product = await getProduct(productCode.value.trim());
            console.log(product)
            if (product) {
                console.log(product.data.data[0])
                updateReportsUI(product.data.data[0]);
    
            }
            
        } catch (error) {
            errorHandler(error);
        }       
    });
}

window.addEventListener('click', (e) => {
    if (e.target.matches('.close')) {
        deleteMessage();
    }
})

const resetDomReportsForm = () => {
    document.getElementById('sifra').value = '';
    document.getElementById('radniNalog').value = '';
    document.getElementById('MISBroj').value = '';
    document.getElementById('duzina').value = '';
    document.getElementById('neto').value = '';
    document.getElementById('bruto').value = '';
}
