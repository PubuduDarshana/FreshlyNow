const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            // Assign the decoded user data to req.user
            req.user = decoded;

            // Check for admin role
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Access forbidden: Admins only' });
            }

            next();
        });
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};