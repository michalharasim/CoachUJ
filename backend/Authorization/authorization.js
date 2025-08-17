const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jose = require('jose');
const { Op } = require('sequelize');
const User = require('./models/User');
require('dotenv').config();

const encryptionKey = jose.base64url.decode(process.env.ENCRYPTION_KEY);


async function encryptPayload(payload) {
    return await new jose.CompactEncrypt(
        new TextEncoder().encode(JSON.stringify(payload))
    )
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .encrypt(encryptionKey);
}


async function generateToken(user) {
    const payload = {
        user_id: user.id,
        role: user.role,
        email: user.email
    };

    const encryptedPayload = await encryptPayload(payload);

    return jwt.sign(
        { data: encryptedPayload },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256' }
    );
}


exports.register = async (req, res) => {
    try {
        const { username, email, password, isCoach } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'wymagane są wszyskie pola' });
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res
                .status(409)
                .json({ error: 'Nazwa użytkownika lub email już istnieje' });
        }

        let accRole = isCoach ? 'trainer' : 'client';
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: accRole,
        });

        await fetch('http://localhost:2137/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            })
        });

        res.status(201).json({ message: 'Zarejestrowano pomyślnie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Rejestracja nie powiodła się' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'No user with this email' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Błąd autentykacji' });
        }

        const token = await generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logowanie nie powiodło się' });
    }
};
