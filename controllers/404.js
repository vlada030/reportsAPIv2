const pageNotFound = (req, res, next) => {
    res.status(404).render('404', {title: "Greška"});
}

module.exports = pageNotFound;