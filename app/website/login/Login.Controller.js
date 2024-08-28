const UserModel = require("../../admin/Users/models/client.model")

exports.LoginUser = async (req, res) => {
    
    try {
        const { username, Password } = req.body;
        const user = await UserModel.findOne({ username: username });
        console.log(user,"this is fdsafsdafdsafdsa")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordValid = Password === user.Password;
        
        if (!isPasswordValid) {
            console.log("hello from login Controller")        
            return res.status(401).json({ message: "Invalid password" });
        }


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