exports.createBusiness = (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO businesses (name, description, owner_id) VALUES (?, ?, ?)', 
        [name, description, userId], 
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Business created successfully' });
        }
    );
};
