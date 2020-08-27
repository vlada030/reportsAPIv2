import axios from 'axios';

// slanje CSRF tokena uz svaki axios request
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');;


//axios.defaults.withCredentials = true;
const baseURL = 'http://127.0.0.1:5000';

export const getProduct = async ( value ) => {
        
    const result = await axios({
        method: 'GET',
        url: `${baseURL}/api/v2/products/${value}/json`           
    });

    return result;     
}

export const deleteReport = async ( value ) => {
        
    const result = await axios({
        url: `${baseURL}/api/v2/reports/dom/${value}`,
        method: 'DELETE'           
    });

    return result;      
}

export const updateProduct = async ( value, data ) => {
        
    const result = await axios({
        url: `${baseURL}/api/v2/products/${value}`,
        method: 'PUT',
        data           
    });

    return result;      
}