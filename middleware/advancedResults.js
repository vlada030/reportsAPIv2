const advancedResults = (model, populate) =>async (req, res, next) => {
    let query;

    let reqQuery = {...req.query};

    // izbacujemo iz req.query reci koje nisu polja u Mongo
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach( field => delete reqQuery[field]);

    // Mongo u find prihvata objekat koji je slican req.query tj
    // specijalnim recima gt, lt nedostaje $ da bi bili identicni
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

    query = model.find(JSON.parse(queryStr));

    // ukupan broj pronadjenih dokumenata nakon zadatog query, a pre limit/page
    const queryResults = await query;
    const total = queryResults.length;

    // ukoliko postoji select filter u req.query, u mongoose on se dodaje sa razmacima
    // izmedju imena polja 
    if (req.query.select) {
        // const selQuery = req.query.select.replace(/,/g, ' ' );
        const selQuery = req.query.select.split(',').join(' ');
        query = query.select(selQuery);
    }

    // ukoliko postoji sort filter u req.query,ako ne defaultno je po datumu kreiranja
    if (req.query.sort) {
        query = query.sort(req.query.sort);
    } else {
        query = query.sort('-createdAt');
    }

    // Dodavanje paginacije
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // za ukupan broj doumenata u kolekciji
    // const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // dodavanje populate ako ga ima - da povlaci podatke iz druge kolekcije
    if (populate) {
        query = query.populate(populate);
    }
    
    const results = await query;
    
    // prilagodjavanje responsa za lakse povezivanje sa front-endom
    // vraca u res da li ima prev/next strana
    let pagination = {};

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit 
        };
    }

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    res.advancedResults = {
        success: true,
        count: total,
        pagination,
        data: results
    };

    next();
};

module.exports = advancedResults;