const pageNotFound = (req, res, next) => {
    res.status(404).render('404', {title: "Greška", path: 'none', lang: 'none'});
}

module.exports = pageNotFound;