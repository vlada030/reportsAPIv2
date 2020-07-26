const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
    // ovo vraca promise, ali se svejedno moze vratiti i ovako jer izvrsenje sledeceg koda ne zavisi od ovoga, prakticno se izvrasava u paraleli
    sgMail.send({
        to: email,
        from: 'vladimir.nikodijevic@tfkable.com',
        subject: 'Prijava na platformu Reports.',
        text: `Postovani ${name}, dobrodosli na platformu Fabrike Kablova Zajecar za pravljenje Izvestaja.`
    })
}

const sendCancelEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'vladimir.nikodijevic@tfkable.com',
        subject: 'Odjava sa platforme Reports',
        text: `Postovani ${name}, zao nam je sto se odjavljujete sa platforme Fabrike Kablova Zajecar. Srdacan pozdrav!`
    })
}

const sendResetPasswordEmail = (name, email, text) => {
    sgMail.send({
        to: email,
        from: 'vladimir.nikodijevic@tfkable.com',
        subject: 'Link za resetovanje sifre',
        text
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail,
    sendResetPasswordEmail
};