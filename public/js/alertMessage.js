// prikazivanje poruka nakon manipulacije na FE
// generisanje poruke
export const showMessage = (message, type) => {
    //const markup = `<div class="alert alert--${type}">${message}</div>`;

    const markup = `<div class="alert alert--${type}"><p>${message}</p><p class="close">&times;</p></div>`;
    
    // pre prikazivanje nove poruke obriši staru
    deleteMessage();
  
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

    //window.setTimeout(deleteMessage, 2000)
}

// brisanje poruke
export const deleteMessage = () => {
    const message = document.querySelector('.alert');

    if (message) {
        
        message.parentElement.removeChild(message)
    }
}