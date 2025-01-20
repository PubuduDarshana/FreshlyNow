const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Access denied. Invalid token format.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;