const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { username, email, password },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }

}

async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username, email, password },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        await prisma.user.delete({ where: { id: userId } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
