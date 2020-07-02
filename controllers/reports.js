// @desc   Domestic Reports
// @route  GET /api/v2/reports/dom
// @access Private

exports.getDomReportsHTML = (req, res, next) => {
    const lang = req.query.lang;
    res.status(200).render('domReports', {title: 'Izveštaji za domaće tržište', path: 'dom', lang: lang});
};

// @desc   Export Reports
// @route  GET /api/v2/reports/exp
// @access Private

exports.getExpReportsHTML = (req, res, next) => {
    const lang = req.query.lang;
    res.status(200).render('expReports', {title: 'Izveštaji za inostrano tržište', path: 'ino', lang: lang});
};

// @desc   Shift Reports
// @route  GET /api/v2/reports/shift
// @access Private

exports.getShiftReportsHTML = (req, res, next) => {

    res.status(200).render('shiftReports', {title: 'Smenski izveštaj o radu', path: 'shift', lang: 'ser'});
};

// @desc   Shift Reports
// @route  GET /api/v2/reports/shift
// @access Private

exports.proba = (req, res, next) => {

    res.status(200).render('create_product', {title: 'Smenski izveštaj o radu', path: 'none', lang: 'ser'});
};