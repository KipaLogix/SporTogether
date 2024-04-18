const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMessage = async (req, res) => {
    try {
        const { senderId, eventId, content } = req.body;
        const message = await prisma.message.create({
            data: {
                senderId,
                eventId,
                content
            },
        });
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create message' });
    }
}

const getMessagesByEventId = async (req, res) => {
    try {
        const { eventId } = req.params;
        const messages = await prisma.message.findMany({
            where: {
                eventId,
            },
        });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get messages' });
    }
}

module.exports = {
    createMessage,
    getMessagesByEventId,
};