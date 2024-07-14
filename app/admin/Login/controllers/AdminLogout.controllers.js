const jwt = require('jsonwebtoken');
const UserModel = require("../../Users/models/Admin.model")

const logout = async (req, res) => {
    const token = req.headers.LoginToken?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required for logout' });
    }

    try {
        // Decode the token to get the expiration time
        const decodedToken = jwt.decode(token);
        if (!decodedToken) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Delete token
        await UserModel.deleteOne({ token });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = logout;
