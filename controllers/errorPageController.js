const pageNotFound = (req, res, next) => {
    res.status(404).render('error_page', {title: "Greška"});
}

module.exports = pageNotFound;