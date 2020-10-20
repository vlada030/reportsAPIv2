const pageNotFound = (req, res, next) => {
    res.status(404).render("error_page", {
        title: "Greška",
        userName: req.session.name,
        avatarUrl: req.session.avatarUrl
    });
}

module.exports = pageNotFound;