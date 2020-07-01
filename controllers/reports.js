// @desc   Domestic Reports
// @route  GET /api/v2/dom_reports
// @access Private

exports.getDomReportsHTML = (req, res, next) => {
    res.status(200).render('domReports', {title: 'Izveštaji za domaće tržište', path: 'dom', lang: 'eng'});
};