const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const url = req.originalUrl;
    if (url === '/api/users/login' || url === '/api/users/register') {
        // user needs to login or register to receive a token
        next();
    } else {
        //verify that user has a token in order to access the protected routes
        
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];
        try {
            const { id } = jwt.verify(token, process.env.SECRET);

            req.user = await prisma.user.findUnique({ where: { id: id } }).id;
            next()
        } catch (error) {
            res.status(401).json({ error: 'Request is not authorized' })
        }
    }
}

module.exports = requireAuth;