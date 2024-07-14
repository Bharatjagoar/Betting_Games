const UserModel = require("../../admin/Users/models/client.model")

exports.LoginUser = async (req, res) => {
    try {
        const { username, Password } = req.body;
        console.log(username)
        // Find user by username
        const user = await UserModel.findOne({ name: username });
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordValid = Password === user.Password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // // Compare secret code
        // const isSecretCodeValid = SecretCode === user.SecretCode;

        // if (!isSecretCodeValid) {
        //     return res.status(401).json({ message: "Invalid secret code" });
        // }

        // Create token
        // const token = jwt.sign({ user }, 'MyScretKey', { expiresIn: '5h' });

        res.status(200).json({
            message: "Login successful",
            data: user._id
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}