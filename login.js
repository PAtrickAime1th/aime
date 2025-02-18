exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (result.length === 0) return res.status(401).json({ message: 'User not found' });

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      
      req.session.user = user;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
};
