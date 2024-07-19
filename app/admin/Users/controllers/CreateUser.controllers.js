const AdminModel = require("../models/Admin.model");
const clientModel = require("../models/client.model");

const crypto = require("crypto");

function generateUsername() {
  const prefix = "ADM";
  const length = 8;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length - prefix.length);
  let result = prefix;

  for (let i = 0; i < bytes.length; i++) {
    result += characters[bytes[i] % characters.length];
  }

  return result;
}

exports.AddUser = async (req, res) => {
  try {
    console.log(req.body);
    // Example usage
    const username = generateUsername();
    req.body.username = username;
    const response = await AdminModel.create(req.body);

    res.status(200).json({
      message: "sucessfully created user",
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const response = await AdminModel.find();
    res.status(200).json({
      message: "sucessfully fetch data",
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.getUserListByRole = async (req, res) => {
  try {
    console.log(req.query.role);
    const response = await AdminModel.find({
      userType: req.query.role,
    });
    res.status(200).json({
      message: "sucessfully fetch data",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};
exports.getUpline = async (req, res) => {
  try {
    console.log(req.query.role);
    const response = await AdminModel.find({
      userType: req.query.role,
    });
    res.status(200).json({
      message: "sucessfully fetch data",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.CreateClient = async (req, res) => {
  try {
    const username = generateUsername();
    req.body.username = username;
    const response = await clientModel.create(req.body);

    res.status(200).json({
      message: "sucessfully Create Client",
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};
exports.GetClient = async (req, res) => {
  try {
    const response = await clientModel.find();
    res.status(200).json({
      message: "sucessfully fetch data",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.GetOwnerCoins = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const response = await AdminModel.findById(id).select(
      "name coins username"
    );

    res.status(200).json({
      message: "sucessfully Create Client",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await AdminModel.findById(id);

    if (!response) {
      const client = await clientModel.findById(id);
      if (client) {
        return res.status(200).json({
          message: "sucessfully fetch Client data",
          data: client,
        });
      } else {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
    } else {
      return res.status(200).json({
        message: "sucessfully fetch Admin data",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

exports.updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reference, matchShare, casinoShare, casinoComm, DoneById } =
      req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (reference !== undefined) updateData.reference = reference;
    if (matchShare !== undefined) updateData.matchShare = matchShare;
    if (casinoShare !== undefined) updateData.casinoShare = casinoShare;
    if (casinoComm !== undefined) updateData.casinoComm = casinoComm;

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return res.status(200).json({
      message: "Successfully updated admin data",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

//------------------------------------------------- Update Status Controller----------------------------------------------------
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let response;
    response = await AdminModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!response) {
      response = await clientModel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      return res.status(200).json({
        message: "sucessfully Update Client",
        data: response,
      });
    }
    if (!response) {
      res.status(404).json({
        message: "User not Found",
      });
    }

    res.status(200).json({
      message: "sucessfully Update Admin",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

// ------------------------------------------------- Get Password Controller---------------------------------------------------------
exports.getUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Admin = await AdminModel.findById(id);
    if (!Admin) {
    const client  = await clientModel.findById(id);
       if(client){
    const { Password } = client;
     res.status(404).json({
      message:"Success",
      data:Password
     })
      }else{
      res.status(404).json({
       message:"client not found",
       data:{}
      })
      }
  } else {
      const {Password } = Admin;
      console.log("Admin pass" ,Password);
      res.status(404).json({
        message:"Success",
        data:Password
      })
    }
  } catch (error) {
      res.status(500).json({
      message: "internel error",
      error,
    });
  }
};

// ------------------------------------------------- Reset Password Controller---------------------------------------------------------

exports.userResetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    let updatedClientPassword;
    if (!newPassword)
      res.status(404).json({
        code: 400,
        message: "new password is required",
      });
    const Admin = await AdminModel.findById(id);
    if (!Admin) {
      let client = await clientModel.findById(id);
      if (client) {
        updatedClientPassword = await clientModel.updateOne(
          { _id: id },
          { $set: { Password: newPassword } },
          { new: true }
        );
        if (!updatedClientPassword) {
          res.status(404).json({
            message: "Password is not updated please try again later..",
          });
        }
        res.status(200).json({
          message: "Password successfully changed..",
          data: updatedClientPassword,
        });
      }
    } else {
      const UpdatedAdminPassword = await AdminModel.updateOne(
        { _id: id },
        { $set: { Password: newPassword } },
        { new: true }
      );
      if (!UpdatedAdminPassword) {
        res.status(404).json({
          message: "Password is not updated please try again later..",
        });
      }
      res.status(200).json({
        message: "Password successfully changed..",
        data: UpdatedAdminPassword,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "internel error",
      error,
    });
  }
};
