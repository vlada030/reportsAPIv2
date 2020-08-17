// middleware koji preko locals promenjive dodaje svakoj ( SAMO! ) renderovanoj strani vrednost promenjive koja se javlja
// u ovom slucaju se koristi za csrfToken promenjivu da je nebi dodavali kod svakog res.render, a moze i za svaku drugu promenjivu npr isAuhtnticated
const localsVariable = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken();

    next();
}

module.exports = localsVariable;