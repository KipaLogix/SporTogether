const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getEventsSports = async (req, res) => {
    try {
        const sports = await prisma.sport.findMany()
        res.status(200).json(sports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve sports' });
    }
};

module.exports = { getEventsSports };