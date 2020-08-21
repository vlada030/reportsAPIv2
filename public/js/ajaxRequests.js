import axios from 'axios';

export const getProduct = async ( value ) => {
    
        const result = await axios({
            method: 'GET',
            url: `http://127.0.0.1:5000/api/v2/products/${productCode.value.trim()}/json`
        });

        return result;   
    
}