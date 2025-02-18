exports.getAllBusinesses = (req, res) => {
    db.query('SELECT * FROM businesses', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};
