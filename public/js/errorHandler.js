// ovo je defaultni AXIOS error handler
import {showMessage, deleteMessage} from './alertMessage';

export default error => {
    // console.log('X', error)
    // console.log('XX',error.message)
    // console.log('XXX',error.response)
    // console.log('XXXX',error.error)
    
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response);

        if (error.response.status === 500) {
            console.log('Greška sa serverom');
            showMessage('Greška sa serverom', 'error');

        } else if (error.response.status === 422 && error.response.config.url.endsWith('/json')) {
            console.log('Greska prilikom validacije axios PUT requesta')
            showMessage('Greska prilikom validacije axios PUT requesta', 'error')
        
        } else if (error.response.status === 422 && error.response.config.url.includes('/resetpassword/')) {
            console.log('Neispravan token. Obratite pažnju da imate 10 minuta od momenta pristizanja emaila da resetujete zaboravljenu šifru.');
            showMessage('Neispravan token. Obratite pažnju da imate 10 minuta od momenta pristizanja emaila da resetujete zaboravljenu šifru.', 'error');
            window.setTimeout(() => {
                
                window.close();                    
                
            }, 3000);

        } else if (error.response.status === 422) {
            console.log('Greska prilikom validacije axios PUT requesta')
            showMessage(error.response.data.data, 'error')
        
        } else if (error.response.status === 401 && error.response.config.url.endsWith('auth/me/updatepassword')) {
            console.log('Unesite ispravnu tekuću šifru')
            showMessage('Unesite ispravnu tekuću šifru', 'error')
        } else if (error.response.status === 400 && error.response.config.url.endsWith('auth/me/avatar')) {
            console.log('Izabrani fajl mora da bude slika i veličine do 10MB')
            showMessage('Izabrani fajl mora da bude slika i veličine do 10MB', 'error')

        } else {
            //console.log(error.response.status);
            //console.log(error.response.data.error);
            showMessage(error.response.data.error, 'error')

        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log(error.request);
        console.log('Greška u konekciji sa serverom');
        showMessage('Greška u konekciji sa serverom', 'error');
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log(error.message);
        showMessage(error.message, 'error');
    }
}

