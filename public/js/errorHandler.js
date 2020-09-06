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
        //console.log(error.response);

        if (error.response.status === 500) {
            console.log('Greška u konekciji sa serverom');
            showMessage('Greška u konekciji sa serverom', 'error');
        } else if (error.response.status === 422) {
            console.log('Greska prilikom validacije axios PUT requesta')
            showMessage(error.response.data.data, 'error')
        
        } else if (error.response.status === 404) {
            console.log('Proizvod sa unetom šifrom ne postoji!')
            showMessage('Proizvod sa unetom šifrom ne postoji', 'error')
        }
         else {
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

