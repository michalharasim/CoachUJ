const jwt = require('jsonwebtoken');
const jose = require('jose');
require('dotenv').config();

const encryptionKey = jose.base64url.decode(process.env.ENCRYPTION_KEY);

async function decryptPayload(encrypted) {
    const { plaintext } = await jose.compactDecrypt(encrypted, encryptionKey);
    return JSON.parse(new TextDecoder().decode(plaintext));
}

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid token format' });
    }
    const token = tokenParts[1];

    try {
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        if (!decodedJwt.data) {
            return res.status(400).json({ error: 'Malformed token' });
        }

        const payload = await decryptPayload(decodedJwt.data);

        req.user_id = payload.user_id;
        req.role = payload.role;
        req.email = payload.email;

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
