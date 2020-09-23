import axios from 'axios';

// slanje CSRF tokena uz svaki axios request
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


//axios.defaults.withCredentials = true;
//const baseURL = 'http://127.0.0.1:5000';
// posto su FE i BE na istom sajtu ovo u sustini moze da se izabci
const baseURL = '';

export const getProduct = async ( value ) => {
        
    const result = await axios({
        method: 'GET',
        url: `${baseURL}/api/v2/products/${value}/json`           
    });

    return result;     
}

export const deleteReport = async ( value, kindofReport) => {
    let url;
    // ako je value MIS broj duzina je 7, druga vrednost je ObjectId koja je razlicita od 7
    if (value.length === 7) {
        url = `${baseURL}/api/v2/reports/dom/${value}`;
    } else if (kindofReport === "shift") {
        url = `${baseURL}/api/v2/reports/shift/${value}`;
    } else {
        url = `${baseURL}/api/v2/reports/exp/${value}`;
    }
    const result = await axios({
        url,
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

// promena User Name / Email
export const updateUserDetail = async ( data ) => {
        
    const result = await axios({
        url: `${baseURL}/api/v2/auth/me/update`,
        method: 'PUT',
        data           
    });

    return result;      
}

// promena Passworda
export const updateUserPassword = async ( data ) => {
        
    const result = await axios({
        url: `${baseURL}/api/v2/auth/me/updatepassword`,
        method: 'PUT',
        data           
    });

    return result;      
}
