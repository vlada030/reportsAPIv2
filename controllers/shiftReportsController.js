

// @desc   Shift Reports
// @route  GET /api/v2/reports/shift
// @access Private

exports.getShiftReportsHTML = (req, res, next) => {

    res.status(200).render('shiftReports', {title: 'Smenski izveštaj o radu', path: 'shift', lang: 'none'});
};