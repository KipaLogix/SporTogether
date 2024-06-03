const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const message_logger = require('../loggers/Loggers').message_logger;

const createMessageWebSocket = async (req) => {
    try {
        message_logger.info("Creating a new message");
        const {senderId, eventId, content} = req;
        message_logger.info("Message data: " + JSON.stringify(req.body));
        const message = await prisma.message.create({
            data: {
                senderId,
                eventId,
                content
            },
            include: {
                sender: true,
            },
        });
        message_logger.info("Message created successfully");
        return message;
    } catch (error) {
        message_logger.error("Error creating message: " + error);
        throw new Error(error.message);
    }   
}


const createMessage = async (req, res) => {
    try {
        message_logger.info("Creating a new message");
        const { senderId, eventId, content } = req.body;
        message_logger.info("Message data: " + JSON.stringify(req.body));
        const message = await prisma.message.create({
            data: {
                senderId,
                eventId,
                content
            },
        });
        message_logger.info("Message created successfully");
        res.status(201).json(message);
    } catch (error) {
        message_logger.error("Error creating message: " + error);
        res.status(500).json({ error: 'Failed to create message' });
    }
}

const getMessagesByEventId = async (req, res) => {
    try {
        message_logger.info("Fetching messages by event ID");
        const { eventId } = req.params;
        message_logger.info("Event ID: " + eventId);
        const messages = await prisma.message.findMany({
            where: {
                eventId,
            },
            include: {
                sender: true,
            },
        });
        const messagesWithNullPassword = messages.map(message => ({
            ...message,
            sender: {
                ...message.sender,
                password: null,
            },
        }));
        message_logger.info("Messages fetched successfully");
        res.json(messagesWithNullPassword);
    } catch (error) {
        message_logger.error("Error fetching messages: " + error);
        res.status(500).json({ error: 'Failed to get messages' });
    }
}

module.exports = {
    createMessage,
    getMessagesByEventId,
    createMessageWebSocket,
};