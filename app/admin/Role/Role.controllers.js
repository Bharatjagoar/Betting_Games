const AdminModel = require("../Users/models/Admin.model")
const RoleModel = require("../Role/Role.model")
exports.getUpline = async (req, res) => {
    try {
        console.log(req.query.role)
        const Upline = await RoleModel.aggregate([
            { $match: { type: req.query.role } }, // Match the given role
            {
              $lookup: {
                from: 'roles', // The collection name should be the same as your roles collection
                localField: 'level',
                foreignField: 'level',
                as: 'currentRole'
              }
            },
            { $unwind: '$currentRole' }, // Unwind the currentRole array
            {
              $lookup: {
                from: 'roles',
                let: { level: { $subtract: ['$currentRole.level', 1] } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$level', '$$level'] } } }
                ],
                as: 'oneLevelUp'
              }
            },
            { $unwind: '$oneLevelUp' }, // Unwind the oneLevelUp array
            {
              $project: {
                _id: 0,
                type: '$oneLevelUp.type',
                level: '$oneLevelUp.level'
              }
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: 'type',
                    foreignField: 'userType',
                    as: 'admin'
                }
            },
            {
                $unwind: '$admin'
            },
            {
                $project: {
                    _id: '$admin._id',
                  name: '$admin.name',
                  username: '$admin.username',
                  userType: '$admin.userType'
                }
              },
          ]);
        console.log(Upline)
        const response = await AdminModel.find({
            userType: req.query.role
        })
        res.status(200).json({
            message: "sucessfully All dataa fetch data",
            data: Upline
        })
    } catch (error) {
        res.status(500).json({
            message: "internel error", error
        })
    }
}

exports.checkuprole = async (req, res) => {
  try {
      console.log(req.query.role)
      const Upline = await RoleModel.aggregate([
          { $match: { type: req.query.role } }, // Match the given role
          {
            $lookup: {
              from: 'roles', // The collection name should be the same as your roles collection
              localField: 'level',
              foreignField: 'level',
              as: 'currentRole'
            }
          },
          { $unwind: '$currentRole' }, // Unwind the currentRole array
          {
            $lookup: {
              from: 'roles',
              let: { level: { $subtract: ['$currentRole.level', 1] } },
              pipeline: [
                { $match: { $expr: { $eq: ['$level', '$$level'] } } }
              ],
              as: 'oneLevelUp'
            }
          },
          { $unwind: '$oneLevelUp' }, // Unwind the oneLevelUp array
          {
            $project: {
              _id: 1,
              currentrole: '$currentRole.type',
              onelevelup: '$oneLevelUp.type'
            }
          }
        ]);
      console.log(Upline)
      const response = await AdminModel.find({
          userType: req.query.role
      })
      res.status(200).json({
          message: "sucessfully All dataa fetch data",
          data: Upline
      })
  } catch (error) {
      res.status(500).json({
          message: "internel error", error
      })
  }
}