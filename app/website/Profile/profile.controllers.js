
const RegisterModel = require("../../admin/Users/models/CreateUser.model")
exports.UserHeaderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const user = await RegisterModel.findById(id)
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User Details Not Found",
            })
        }
        // Remove sensitive information
        delete user.Password;

        return res.status(200).json({
            code: 200,
            message: "User Details",
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: error
        })
    }
}
