// @desc   User Panel
// @route  POST /api/v1/user
// @access Private

exports.userLoginForm = (req, res, next) => {
    res.status(200).render('user', {title: "Korisnički panel"});
};