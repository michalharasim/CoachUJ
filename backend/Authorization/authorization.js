const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('./models/User');
require('dotenv').config();

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

        let accRole = isCoach ? 'trener' : 'klient';

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            role: accRole,
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
            return res
                .status(400)
                .json({ error: 'email and password are required' });
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [{ email }]
            }
        });

        if (!user) {
            return res
                .status(401)
                .json({ error: 'No user with this username or email' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Błąd autentykacji' });
        }

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logowanie nie powiodło się' });
    }
};
