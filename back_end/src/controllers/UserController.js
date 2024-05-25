const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const user_logger = require('../loggers/Loggers').user_logger;


async function createUser(req, res) {
    user_logger.info("Creating a new user");
    const { username, email, password } = req.body;
    user_logger.info("User data: " + JSON.stringify(req.body));
    try {
        const newUser = await prisma.user.create({
            data: { username, email, password },
        });
        res.status(201).json(newUser);
        user_logger.info("User created successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
        user_logger.error("Error creating user: " + error);
    }
}

async function getUsers(req, res) {
    user_logger.info("Fetching all users");
    try {
        const users = await prisma.user.findMany();
        res.json(users);
        user_logger.info("Users fetched successfully");
    } catch (error) {
        user_logger.error("Error fetching users: " + error);
        res.status(500).json({ error: 'Error fetching users' });
    }

}

async function getUserById(req, res) {
    user_logger.info("Fetching user by ID");
    const userId = req.params.id;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        user_logger.info("User fetched successfully");
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user_logger.info("User data: " + JSON.stringify(user));
        res.json(user);
    } catch (error) {
        user_logger.error("Error fetching user: " + error);
        res.status(500).json({ error: 'Error fetching user' });
    }
}

async function updateUser(req, res) {
    user_logger.info("Updating user");
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
        message_logger.info("User data: " + JSON.stringify(req.body));
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username, email, password },
        });
        user_logger.info("User updated successfully");
        res.json(updatedUser);
    } catch (error) {
        user_logger.error("Error updating user: " + error);
        res.status(500).json({ error: 'Error updating user' });
    }
}

async function deleteUser(req, res) {
    user_logger.info("Deleting user");
    const userId = req.params.id;
    try {
        await prisma.user.delete({ where: { id: userId } });
        user_logger.info("User deleted successfully");
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        user_logger.error("Error deleting user: " + error);
        res.status(500).json({ error: 'Error deleting user' });
    }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
