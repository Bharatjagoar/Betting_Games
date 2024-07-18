const UserModel = require("../../Users/models/Admin.model");
const AdminLoginModel = require("../models/AdminLogin.model");


const AdminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)

    try {
        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordValid = password === user.Password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Compare secret code
        // const isSecretCodeValid = SecretCode === user.SecretCode;

        // if (!isSecretCodeValid) {
        //     return res.status(401).json({ message: "Invalid secret code" });
        // }

        // // Create token
        // const token = jwt.sign({ user }, 'MyScretKey', { expiresIn: '5h' });

        res.status(200).json({
            message: "Login successful",
            data: {
                user: user._id,
                role: user.userType
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
};

const LoginDetails = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const loginDetails = await AdminLoginModel.find({ userID: id });
        
        return res.status(200).json({
            message: "Successfully fetch data",
            data: loginDetails
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }

}
module.exports = {AdminLogin, LoginDetails};