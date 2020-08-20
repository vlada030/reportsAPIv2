import axios from 'axios';

export const getProduct = async ( value ) => {
    try {
        const result = await axios({
            method: 'GET',
            url: `http://127.0.0.1:5000/api/v2/products/${productCode.value.trim()}/json`,
            withCredentials: true
        });

        return result;
   
    } catch (error) {
        console.log(error)
    }
}