
const UserModel = require("../../admin/Users/models/client.model")

const dummy = [
        {
            "id": 5750517,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "38.241207165634",
            "fancy_id": "andarbahar2",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 0,
            "dr": -400,
            "operation_type": "casino",
            "balance": 1380,
            "prev_bal": 1780,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720783700",
            "comments": "Loss AndarBahar2 - 38.241207165634",
            "created_at": "2024-07-12T11:28:20.000000Z",
            "updated_at": "2024-07-12T11:28:20.000000Z"
        },
        {
            "id": 5750417,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "38.241207165501",
            "fancy_id": "andarbahar2",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 380,
            "dr": 0,
            "operation_type": "casino",
            "balance": 1780,
            "prev_bal": 1400,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720783581",
            "comments": "WON AndarBahar2 - 38.241207165501",
            "created_at": "2024-07-12T11:26:21.000000Z",
            "updated_at": "2024-07-12T11:26:21.000000Z"
        },
        {
            "id": 5717263,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "33404507",
            "fancy_id": "comm",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 1,
            "dr": 0,
            "operation_type": "COMM",
            "balance": 1400,
            "prev_bal": 1399,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720730639",
            "comments": "England Women v New Zealand Women Fancy comm",
            "created_at": "2024-07-11T20:44:00.000000Z",
            "updated_at": "2024-07-11T20:44:00.000000Z"
        },
        {
            "id": 5696854,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "33404507",
            "fancy_id": "38906",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 100,
            "dr": 0,
            "operation_type": "FANCY",
            "balance": 1399,
            "prev_bal": 1299,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720719400",
            "comments": "WON - 1st wkt pship Boundaries NZ W(ENG W vs NZ W)adv",
            "created_at": "2024-07-11T17:36:40.000000Z",
            "updated_at": "2024-07-11T17:36:40.000000Z"
        },
        {
            "id": 5411632,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "38.240907134127",
            "fancy_id": "andarbahar2",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 95,
            "dr": 0,
            "operation_type": "casino",
            "balance": 1299,
            "prev_bal": 1204,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720512844",
            "comments": "WON AndarBahar2 - 38.240907134127",
            "created_at": "2024-07-09T08:14:04.000000Z",
            "updated_at": "2024-07-09T08:14:04.000000Z"
        },
        {
            "id": 5397972,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "33398010",
            "fancy_id": "37055",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 1150,
            "dr": 0,
            "operation_type": "FANCY",
            "balance": 1204,
            "prev_bal": 1204,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720479779",
            "comments": "Session Cancelled Washington Freedom v Texas Super Kings \/ Highest Scoring over Runs in Match(W",
            "created_at": "2024-07-08T23:02:59.000000Z",
            "updated_at": "2024-07-08T23:02:59.000000Z"
        },
        {
            "id": 5383998,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "DragonTiger2 08-07-2024",
            "fancy_id": "dt202",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 3,
            "dr": 0,
            "operation_type": "ODDS",
            "balance": 1204,
            "prev_bal": 1201,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720463402",
            "comments": "Commission DragonTiger2 08-07-2024",
            "created_at": "2024-07-08T18:30:02.000000Z",
            "updated_at": "2024-07-08T18:30:02.000000Z"
        },
        {
            "id": 5383995,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "lucky7b 08-07-2024",
            "fancy_id": "lucky7b",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 6,
            "dr": 0,
            "operation_type": "ODDS",
            "balance": 1201,
            "prev_bal": 1195,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720463402",
            "comments": "Commission lucky7b 08-07-2024",
            "created_at": "2024-07-08T18:30:02.000000Z",
            "updated_at": "2024-07-08T18:30:02.000000Z"
        },
        {
            "id": 5368814,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "0",
            "fancy_id": "0",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 0,
            "dr": 1150,
            "operation_type": "ADMIN",
            "balance": 1195,
            "prev_bal": 2345,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720457591",
            "comments": "Chips withdrawl from Saurabh ( C36978 ) by Raj [Raj]",
            "created_at": "2024-07-08T16:53:11.000000Z",
            "updated_at": "2024-07-08T16:53:11.000000Z"
        },
        {
            "id": 5368674,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "0",
            "fancy_id": "0",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 1150,
            "dr": 0,
            "operation_type": "ADMIN",
            "balance": 2345,
            "prev_bal": 1195,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720457552",
            "comments": "Chips credited to Saurabh ( C36978 ) by Raj [Raj]",
            "created_at": "2024-07-08T16:52:32.000000Z",
            "updated_at": "2024-07-08T16:52:32.000000Z"
        },
        {
            "id": 5367760,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "40.240807221259",
            "fancy_id": "dt202",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 0,
            "dr": -300,
            "operation_type": "casino",
            "balance": 1195,
            "prev_bal": 1495,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720457028",
            "comments": "Loss DragonTiger 20 - 40.240807221259",
            "created_at": "2024-07-08T16:43:48.000000Z",
            "updated_at": "2024-07-08T16:43:48.000000Z"
        },
        {
            "id": 5367568,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "36.240807221001",
            "fancy_id": "lucky7b",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 0,
            "dr": -500,
            "operation_type": "casino",
            "balance": 1495,
            "prev_bal": 1995,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720456832",
            "comments": "Loss Lucky7B - 36.240807221001",
            "created_at": "2024-07-08T16:40:32.000000Z",
            "updated_at": "2024-07-08T16:40:32.000000Z"
        },
        {
            "id": 5367512,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "36.240807220923",
            "fancy_id": "lucky7b",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 0,
            "dr": -100,
            "operation_type": "casino",
            "balance": 1995,
            "prev_bal": 2095,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720456794",
            "comments": "Loss Lucky7B - 36.240807220923",
            "created_at": "2024-07-08T16:39:54.000000Z",
            "updated_at": "2024-07-08T16:39:54.000000Z"
        },
        {
            "id": 5345424,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "25.240807174901",
            "fancy_id": "dt20",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 95,
            "dr": 0,
            "operation_type": "casino",
            "balance": 2095,
            "prev_bal": 2000,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720441190",
            "comments": "WON DragonTiger 20 - 25.240807174901",
            "created_at": "2024-07-08T12:19:50.000000Z",
            "updated_at": "2024-07-08T12:19:50.000000Z"
        },
        {
            "id": 5333539,
            "user_id": 36978,
            "username": "C36978",
            "event_id": "0",
            "fancy_id": "0",
            "c_chips": 0,
            "c_liability": 0,
            "cr": 2000,
            "dr": 0,
            "operation_type": "ADMIN",
            "balance": 2000,
            "prev_bal": 0,
            "give_comm": 0,
            "take_comm": 0,
            "time": "1720419672",
            "comments": "Opening Balance by  Raj (36977) to Saurabh (36978) [Raj,A36977]",
            "created_at": "2024-07-08T06:21:12.000000Z",
            "updated_at": "2024-07-08T06:21:12.000000Z"
        }
    ]

const dummycompletegame = [
    {
      date: "27-05-2024",
      time: "12:00",
      team1: "West Indies",
      team1Img: "./images/icon/chealse.png",
      team2: "South Africa",
      team2Img: "./images/icon/liverpool.png",
      winner: "Kolkata Knight Riders",
      loss: "1000"
    },
    {
      date: "27-05-2024",
      time: "12:00",
      team1: "West Indies",
      team1Img: "./images/icon/chealse.png",
      team2: "South Africa",
      team2Img: "./images/icon/liverpool.png",
      winner: "Kolkata Knight Riders",
      loss: "1000"
    },
    {
      date: "27-05-2024",
      time: "12:00",
      team1: "West Indies",
      team1Img: "./images/icon/chealse.png",
      team2: "South Africa",
      team2Img: "./images/icon/liverpool.png",
      winner: "Kolkata Knight Riders",
      loss: "1000"
    }
  ]

const dummyledger = [
    {
        "id": 1162211,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "AndarBahar2 12-07-2024",
        "event_type": "andarbahar2",
        "amt": 19.8,
        "comment": "AndarBahar2 12-07-2024",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/13\/2024 12:00:02 AM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-12T18:30:02.000000Z",
        "updated_at": "2024-07-12T18:30:02.000000Z",
        "dr": 19.8,
        "cr": 0,
        "balance": -619.8,
        "won_by": "N\/A"
    },
    {
        "id": 1145369,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "33404507",
        "event_type": "match",
        "amt": -101,
        "comment": "England Women v New Zealand Women",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/11\/2024 11:00:00 PM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-11T20:44:00.000000Z",
        "updated_at": "2024-07-11T20:44:00.000000Z",
        "cr": 101,
        "dr": 0,
        "balance": -600,
        "won_by": "England Women"
    },
    {
        "id": 1084417,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "AndarBahar2 09-07-2024",
        "event_type": "andarbahar2",
        "amt": -95,
        "comment": "AndarBahar2 09-07-2024",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/10\/2024 12:00:02 AM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-09T18:30:02.000000Z",
        "updated_at": "2024-07-09T18:30:02.000000Z",
        "cr": 95,
        "dr": 0,
        "balance": -701,
        "won_by": "N\/A"
    },
    {
        "id": 1052252,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "DragonTiger2 08-07-2024",
        "event_type": "dt202",
        "amt": 297,
        "comment": "DragonTiger2 08-07-2024",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/09\/2024 12:00:02 AM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-08T18:30:02.000000Z",
        "updated_at": "2024-07-08T18:30:02.000000Z",
        "dr": 297,
        "cr": 0,
        "balance": -796,
        "won_by": "N\/A"
    },
    {
        "id": 1052169,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "lucky7b 08-07-2024",
        "event_type": "lucky7b",
        "amt": 594,
        "comment": "lucky7b 08-07-2024",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/09\/2024 12:00:02 AM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-08T18:30:02.000000Z",
        "updated_at": "2024-07-08T18:30:02.000000Z",
        "dr": 594,
        "cr": 0,
        "balance": -499,
        "won_by": "N\/A"
    },
    {
        "id": 1052421,
        "user_id": 36978,
        "parent_id": 36977,
        "admin_id": 1,
        "sadmin_id": 3,
        "madmin_id": 12459,
        "master_id": 14354,
        "super_id": 14358,
        "agent_id": 36977,
        "type": "client",
        "collection_name": null,
        "username": "C36978",
        "fullname": "Saurabh",
        "event_id": "DragonTiger 08-07-2024",
        "event_type": "dt20",
        "amt": -95,
        "comment": "DragonTiger 08-07-2024",
        "remarks": null,
        "done_by": null,
        "post_date": "07\/09\/2024 12:00:02 AM",
        "deleted": 0,
        "deleted_by": null,
        "created_at": "2024-07-08T18:30:02.000000Z",
        "updated_at": "2024-07-08T18:30:02.000000Z",
        "cr": 95,
        "dr": 0,
        "balance": 95,
        "won_by": "N\/A"
    }
]
exports.UserHeaderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id)
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
        res.status(500).json({
            error: error
        })
    }
}
exports.UserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id)
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


exports.getpassbook = async (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Suceesfully get user passbook",
            data: dummy
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        })
    }
}

exports.completedgames = async (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Suceesfully get user complete games",
            data: dummycompletegame
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        })
    }
}
exports.getledger = async (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Suceesfully get user complete games",
            data: dummyledger
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        })
    }
}