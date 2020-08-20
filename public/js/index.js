import {getProduct} from './product';
// bez ovoga ne radi npr async/await... i blokira celu app
import '@babel/polyfill';

const productCode = document.getElementById('productCode');

if (productCode) {
    productCode.addEventListener('input', async e => {
        e.preventDefault();
        if (productCode.value.trim() < 7) {
            console.log('Duzina sifre je manja od 7')
            throw new Error('Duzina sifre je manja od 7')
        }
        console.log(productCode.value);
        const product = await getProduct(productCode.value.trim());

        console.log(product.data.data[0])

 
        
    });
}