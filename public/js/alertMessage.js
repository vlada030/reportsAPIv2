// prikazivanje poruka nakon manipulacije na FE
// generisanje poruke
export const showMessage = (message, type) => {
    const markup = `<div class="alert alert--${type}">${message}</div>`;
    
    // pre prikazivanje nove poruke obriši staru
    deleteMessage();
  
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
}

// brisanje poruke
export const deleteMessage = () => {
    const message = document.querySelector('.alert');

    if (message) {
        message.parentElement.removeChild(message);
    }

}