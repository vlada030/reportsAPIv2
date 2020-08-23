import axios from 'axios';

//axios.defaults.withCredentials = true;

export const getProduct = async ( value ) => {
        
        const result = await axios({
            method: 'GET',
            url: `http://127.0.0.1:5000/api/v2/products/${value}/json`
           
        });

        return result;   
    
}