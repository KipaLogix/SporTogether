const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const requireAuthWebSocket = async (socket, next) => {
    //fetch token from handshake
    const token = socket.handshake.auth.token;
    try {
        //verify jwt and get user Data
        const user = jwt.verify(token, process.env.SECRET);
        console.log('user', user);

        // reqUser = await prisma.user.findUnique({ where: { id: user.id } });
        socket.user = user;
        next();
    } catch (e) {
        console.log('error', e.message);
        return next(new Error(e.message));
    }

}

module.exports = requireAuthWebSocket;