const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { resolveTypeReferenceDirective } = require('typescript');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' });
}

const ENCRYPTION_SALT = 10;

const user_logger = require('../loggers/Loggers').user_logger;

async function createUser(username, email, password) {
    if (!username || !email || !password) {
        throw Error('All fields must be filled!');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email');
    }

    // Check if email already exists
    const emailExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (emailExists) {
        throw Error('Email already in use');
    }

    const usernameExists = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (usernameExists) {
        throw Error('Username already in use');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, ENCRYPTION_SALT);

        //User must be unique , otherwise error will be thrown
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        return newUser;
    } catch (error) {
        throw Error('Error creating user')
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
    const { username, email, password, first_name, last_name, city, country, latitude, longitude } = req.body;
    try {
        message_logger.info("User data: " + JSON.stringify(req.body));
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username, email, password, first_name, last_name, city, country, latitude, longitude},
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

async function getUserByCredentials(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }

    // Check if email exists
    let user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        //Try to login by username
        const username = email;
        user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            throw Error('Wrong credentials');
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw Error('Wrong credentials');
    }
    return user;
}


//login user
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await getUserByCredentials(email, password);
        // create token
        const token = createToken(user.id);
        res.status(201).json({ token, user });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

}

//register user
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const newUser = await createUser(username, email, password);
        // create token
        const token = createToken(newUser.id);

        res.status(201).json({ token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}


module.exports = { createUser, getUserById, updateUser, deleteUser, loginUser, registerUser };

