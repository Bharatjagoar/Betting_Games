const AdminModel = require("../Users/models/Admin.model");
const clientModel = require("../Users/models/client.model");

exports.LimitUserList = async (req, res) => {
  try {
    const { role } = req.query;
    if (role === "ClientMaster") {
        const data = await clientModel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    userType: 1,
                    username: 1,
                    coins: 1,
                }
            }
        ]);
        return res
          .status(200)
          .json({ message: "Successfully Get Users", code: 200, data: data });
    }
    const data = await AdminModel.aggregate([
        { $match: { userType: role } },
        {
            $project: {
                _id: 1,
                name: 1,
                userType: 1,
                username: 1,
                coins: 1,
            }
        }
    ]);
    return res
      .status(200)
      .json({ message: "Successfully Get Users", code: 200, data: data });
    
  } catch (error) {
    return res
    .status(500)
    .json({ message: "server error", error: error,});
  }
};


exports.LimitOwnerCoins = async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = await AdminModel.findById(id).select("coins")
        return res
      .status(200)
      .json({ message: "Successfully Get Users", code: 200, data: data });
    } catch (error) {
        console.error(error)
        return res
        .status(500)
        .json({ message: "server error", error: error,});
    }
}

exports.LimitUpadteUserCoins = async (req, res) => {
    try {
        const { id } = req.params;
        const { coins, operation, owner, role } = req.body;

        // Determine the user model based on the role
        const userModel = role === "ClientMaster" ? clientModel : AdminModel;
        const ownerModel = AdminModel;

        // Fetch the user and owner data
        const [user, OwnerData] = await Promise.all([
            userModel.findById(id),
            ownerModel.findById(owner)
        ]);

        if (!user) {
            return res.status(404).json({ message: "User not found", code: 404 });
        }

        if (!OwnerData) {
            return res.status(404).json({ message: "Owner not found", code: 404 });
        }

        let updatedCoins, updatedOwnerCoins;

        if (operation === "Add") {
            if (OwnerData.coins < coins) {
                return res.status(403).json({ message: "Not enough chips", code: 403 });
            }
            updatedCoins = user.coins + coins;
            updatedOwnerCoins = OwnerData.coins - coins;
        } else {
            if (user.coins < coins) {
                return res.status(403).json({ message: "User does not have enough chips", code: 403 });
            }
            updatedCoins = user.coins - coins;
            updatedOwnerCoins = OwnerData.coins + coins;
        }

        // Update the user and owner data
        const [updatedUser, updatedOwner] = await Promise.all([
            userModel.findByIdAndUpdate(id, { $set: { coins: updatedCoins } }, { new: true }),
            ownerModel.findByIdAndUpdate(owner, { $set: { coins: updatedOwnerCoins } }, { new: true })
        ]);

        return res.status(200).json({
            message: "Successfully updated user's coins",
            code: 200,
            data: { user: updatedUser, owner: updatedOwner }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error });
    }
};
