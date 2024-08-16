const axios = require("axios");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
const AndarBaharManual = require("../app/website/andarBaharManual/controller/controller")
// const Match = require("./../app/website/matchList/Match.model"); // Adjust the path as necessary
// const Market = require("../app/website/matchList/Market.model");
// const matchScore = require("../app/website/matchList/ScoreMatchId.model");
// const Bookmakers_List = require("../app/website/matchList/Bookmakers_List.model");
// const casinoshortnameModel = require("../app/website/casino/model/casinoshortname.model");
// const StoreLastdataAndDeclearResult = require("../app/utils/DeclearCasinoResult");

const demodata = {
    "message": "Data Fetched",
    "code": 0,
    "error": false,
    "data": {
        "data": {
            "t1": [
                {
                    "mid": "36.240308133751",
                    "autotime": "15",
                    "gtype": "lucky7eu",
                    "min": 5,
                    "max": 20000,
                    "C1": "1"
                }
            ],
            "t2": [
                {
                    "nat": "LOW Card",
                    "sid": "1",
                    "rate": "2.00",
                    "min": 100,
                    "max": 300000,
                    "gstatus": "1"
                },
                {
                    "nat": "HIGH Card",
                    "sid": "2",
                    "rate": "2.00",
                    "min": 100,
                    "max": 300000,
                    "gstatus": "1"
                },
                {
                    "nat": "Even",
                    "sid": "3",
                    "rate": "2.10",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Odd",
                    "sid": "4",
                    "rate": "1.79",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Red",
                    "sid": "5",
                    "rate": "1.95",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Black",
                    "sid": "6",
                    "rate": "1.95",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 1",
                    "sid": "7",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 2",
                    "sid": "8",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 3",
                    "sid": "9",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 4",
                    "sid": "10",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 5",
                    "sid": "11",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 6",
                    "sid": "12",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 7",
                    "sid": "13",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 8",
                    "sid": "14",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 9",
                    "sid": "15",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card 10",
                    "sid": "16",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card J",
                    "sid": "17",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card Q",
                    "sid": "18",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                },
                {
                    "nat": "Card K",
                    "sid": "19",
                    "rate": "12.00",
                    "min": 100,
                    "max": 25000,
                    "gstatus": "1"
                }
            ],
            "status": "success"
        },
        "result": [
            {
                "result": "2",
                "mid": "36.240308133709"
            },
            {
                "result": "1",
                "mid": "36.240308133630"
            },
            {
                "result": "2",
                "mid": "36.240308133551"
            },
            {
                "result": "1",
                "mid": "36.240308133513"
            },
            {
                "result": "1",
                "mid": "36.240308133432"
            },
            {
                "result": "2",
                "mid": "36.240308133352"
            },
            {
                "result": "2",
                "mid": "36.240308133311"
            },
            {
                "result": "2",
                "mid": "36.240308133232"
            },
            {
                "result": "1",
                "mid": "36.240308133152"
            },
            {
                "result": "1",
                "mid": "36.240308133112"
            }
        ]
    }
}

// Define the path to the log file
const logFilePath = path.join(__dirname, "error.log");

// Function to log messages to a file
const logError = (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFile(logFilePath, `${timestamp} - ERROR: ${message}\n`, (err) => {
        if (err) console.error("Failed to write to log file:", err.message);
    });
};

// Function to get the current date in IST format (YYYY-MM-DD)
const getTodayDateIST = () => {
    const todayUTC = new Date();
    const istOffset = 5.5 * 60; // 5 hours 30 minutes in minutes
    const utcOffset = todayUTC.getTimezoneOffset(); // offset in minutes from UTC

    const istDate = new Date(todayUTC.getTime() + (istOffset + utcOffset) * 60000);

    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, "0");
    const day = String(istDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

// Function to fetch matches on a specific date

const fetchMatchesOnSpecificDate = async (specificDate) => {
    const regexPattern = `^${specificDate}`;

    const matchesOnSpecificDate = await Match.aggregate([
        // {
        //   $match: {
        //     "event.openDate": {
        //       $regex: regexPattern,
        //     },
        //     },
        //   },
        {
            $addFields: {
                openDateAsDate: {
                    $dateFromString: {
                        dateString: "$event.openDate",
                    },
                },
            },
        },
        {
            $project: {
                _id: 1,
                TeamA: {
                    $arrayElemAt: [{ $split: ["$event.name", " v "] }, 0],
                },
                TeamB: {
                    $arrayElemAt: [{ $split: ["$event.name", " v "] }, 1],
                },
                openDate: "$event.openDate",
                openDateAsDate: 1,
                MatchId: "$event.id",
                marketCount: 1,
                scoreboard_id: 1,
                selections: 1,
                liability_type: 1,
                undeclared_markets: 1,
            },
        },
        {
            $sort: { openDateAsDate: 1 },
        },
    ]);

    return matchesOnSpecificDate;
};

// Function to fetch data from an API
const fetchDataFromAPI = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        logError(`Error fetching data from ${url}: ${error.message}`);
        throw error;
    }
};
const GetScoreIDBymatchId = async (matchId) => {
    try {
        const data = await matchScore.aggregate([
            {
                $lookup: {
                    from: 'matchlists', // The name of the collection to join
                    localField: 'Match_list_Id',
                    foreignField: '_id',
                    as: 'match_list_details'
                }
            },
            { $unwind: '$match_list_details' }, // If you expect only one match_list_detail
            { $match: { 'match_list_details.event.id': `${matchId}` } }, // Match after lookup
            {
                $project: {
                    _id: 0,
                    match_id: 1
                }
            }
        ]);


        // Extracting match_id from the result
        const matchIds = data.map(doc => doc.match_id);
        //check
        console.log("matchIds", matchIds)
        return data ? matchIds[0] : matchId; // Assuming you want the first (and only) matched match_id
    } catch (error) {
        const errorMessage = `Error getting score ID for matchId ${matchId} : ${error.message}`;
        console.error(errorMessage);
        logError(errorMessage);
    }
}


// Function to fetch session odds and other related data
const updateSessionOdds = async (matchId, marketId, BookmakersId) => {
    try {
        let scoreId = await GetScoreIDBymatchId(matchId)
        scoreId = scoreId === undefined ? matchId : scoreId
        const sessionUrl = `http://84.8.153.51/api/v2/getSessions?EventTypeID=4&matchId=${matchId}`;
        const oddsUrl = `http://84.8.153.51/api/v2/getBookmakerOdds?EventTypeID=4&marketId=${BookmakersId}`;
        const scoreUrl = `http://84.8.153.51/api/v2/score?EventTypeID=4&matchId=${scoreId}`;


        const fetchedData = (await fetchDataFromAPI(sessionUrl)).map((item) => {
            item.gtype = "session";
            return item;
        });

        let MatchOdds = []
        if (BookmakersId) {
            MatchOdds = await fetchDataFromAPI(oddsUrl);
        }
        const scorecboardData = await fetchDataFromAPI(scoreUrl);

        return { fetchedData, MatchOdds, scorecboardData };
    } catch (error) {
        console.log(error)
        const errorMessage = `Error updating session odds for matchId ${matchId} and marketId ${marketId}: ${error.message}`;
        console.error(errorMessage);
        logError(errorMessage);
        return { fetchedData: [], MatchOdds: [], scorecboardData: {} };
    }
};



let latestData = {};

const emitCricketData = async (io, matchId) => {
    try {
        const market = await Market.findOne({ match: matchId });

        console.log(`cricket data data for market Id ${market} and match id ${matchId}`)


        const BookmakersId = await Bookmakers_List.findOne({ match: matchId, marketName: "Bookmaker" });
        const { fetchedData, MatchOdds, scorecboardData } = await updateSessionOdds(
            matchId,
            market.marketId,
            BookmakersId ? BookmakersId.marketId : null
        );

        if (fetchedData.length > 0 && MatchOdds.length > 0 && Object.keys(scorecboardData).length > 0) {
            latestData[matchId] = {
                fetchedData,
                MatchOdds,
                scorecboardData
            };
        }

        io.to(`match_${matchId}`).emit("receiveData", {
            fetchedData: latestData[matchId].fetchedData,
            MatchOdds: latestData[matchId].MatchOdds,
            scorecboardData: latestData[matchId].scorecboardData
        });

        // io.to(`match_${matchId}`).emit("receiveData", {
        //   fetchedData: latestData[matchId]?.fetchedData || [],
        //   MatchOdds: latestData[matchId]?.MatchOdds || [],
        //   scorecboardData: latestData[matchId]?.scorecboardData || {}
        // });
    } catch (error) {
        const errorMessage = `Error processing cricket data for matchId ${matchId}: ${error.message}`;
        console.error(errorMessage);
        logError(errorMessage);

        // Emit the last known good data in case of error
        if (latestData[matchId]) {
            io.to(`match_${matchId}`).emit("receiveData", latestData[matchId]);
        }
    }
};

const CasinoAPIData = async (shortname) => {
    try {
        const casinoUrl = `https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=${shortname}`;
        const fetchedCasinoData = await fetchDataFromAPI(casinoUrl);
        console.log("this casino data fetchedCasinoData", fetchedCasinoData)
        return { fetchedCasinoData: fetchedCasinoData };

    } catch (error) {
        const errorMessage = `Error updating casino data: ${error.message}`;
        console.error(errorMessage);
        logError(errorMessage);
        return { fetchedCasinoData: {} };
    }
};

let latestCasinoData = {};

const CasinoData = async (io, gameId) => {
    try {

        // Fetch data from API
        const response = await CasinoAPIData(gameId);
        console.log("Fetched casino data:", response);

        const fetchedCasinoData = response?.fetchedCasinoData || {};

        if (Object.keys(fetchedCasinoData).length > 0) {
            latestCasinoData[gameId] = { fetchedCasinoData };
        }

        StoreLastdataAndDeclearResult(latestCasinoData[gameId]?.fetchedCasinoData?.data)

        // Emit the full data to the specific room
        io.to(`casino_${gameId}`).emit("receiveData", {
            message: "Successfully fetched",
            data: latestCasinoData[gameId].fetchedCasinoData,
        });

    } catch (error) {
        const errorMessage = `Error processing Casino data for gameId ${gameId}: ${error.message}`;
        console.error(errorMessage);
        logError(errorMessage);

        if (latestCasinoData[gameId]) {
            io.to(`casino_${gameId}`).emit("receiveData", {
                message: "Failed to fetch new data, serving last known good data",
                data: latestCasinoData[gameId].fetchedCasinoData
            });
        } else {
            io.to(`casino_${gameId}`).emit("receiveData", {
                message: "Failed to fetch data and no previous data available",
                data: []
            });
        }
    }
};


// Function to setup socket.io and handle events
const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    const intervals = {}; // To keep track of intervals
    const roomCounts = {}; // To keep track of the number of users in each room
    const CasinoRoomCound = {}
    const Casinointervals = {}

    io.on("connection", async (socket) => {
        try {
            const specificDate = getTodayDateIST();
            const matchesOnSpecificDate = await fetchMatchesOnSpecificDate(specificDate);
            AndarBaharManual.SetFirstCard(io)
            console.log("A user connected", socket.id);

            // Handle socket events
            socket.on("joinMatch", async (matchId) => {
                if (!roomCounts[matchId]) {
                    roomCounts[matchId] = 0;
                }
                console.log("use jioned match", matchId)

                roomCounts[matchId]++;

                await emitCricketData(io, matchId);


                if (!intervals[matchId]) {
                    try {
                        const match = matchesOnSpecificDate.find(
                            (m) => String(m.MatchId) === matchId
                        );

                        if (!match) throw new Error(`Match with ID ${matchId} not found`);

                        socket.join(`match_${match.MatchId}`);
                        console.log(`User joined match room: match_${match.MatchId}`);

                        intervals[matchId] = setInterval(async () => {
                            try {
                                await emitCricketData(io, matchId);
                            } catch (error) {
                                clearInterval(intervals[matchId]);
                            }
                        }, 3000);
                    } catch (error) {
                        const errorMessage = `Error joining match room for matchId ${matchId}: ${error.message}`;
                        console.error(errorMessage);
                        logError(errorMessage);
                    }
                } else {
                    socket.join(`match_${matchId}`);
                    console.log(`User joined match room: match_${matchId}`);
                }
            });


            socket.on("leaveMatch", (matchId) => {
                try {
                    socket.leave(`match_${matchId}`);
                    console.log(`User left match room: match_${matchId}`);

                    if (roomCounts[matchId]) {
                        roomCounts[matchId]--;
                    }

                    if (roomCounts[matchId] === 0 && intervals[matchId]) {
                        clearInterval(intervals[matchId]);
                        delete intervals[matchId];
                    }
                } catch (error) {
                    const errorMessage = `Error leaving match room for matchId ${matchId}: ${error.message}`;
                    console.error(errorMessage);
                    logError(errorMessage);
                }
            });

            socket.on("joinCasinoGame", async (gameId) => {

                console.log("room joined with id ", gameId)

                if (!CasinoRoomCound[gameId]) {
                    CasinoRoomCound[gameId] = 0;
                }

                CasinoRoomCound[gameId]++;

                if (!Casinointervals[gameId]) {
                    try {

                        socket.join(`casino_${gameId}`);
                        console.log(`User joined casino room: casino_${gameId}`);


                        await CasinoData(io, gameId);


                        Casinointervals[gameId] = setInterval(async () => {
                            try {
                                await CasinoData(io, gameId);
                            } catch (error) {
                                clearInterval(Casinointervals[gameId]);
                            }
                        }, 3000);
                    } catch (error) {
                        const errorMessage = `Error joining casino room for gameId ${gameId}: ${error.message}`;
                        console.error(errorMessage);
                        logError(errorMessage);
                    }
                } else {
                    socket.join(`casino_${gameId}`);
                    console.log(`User joined casino room: casino_${gameId}`);
                }
            });




            socket.on("leaveCasinoGame", (gameId) => {
                try {
                    socket.leave(`casino_${gameId}`);
                    console.log(`User left casino room: casino_${gameId}`);

                    if (CasinoRoomCound[gameId]) {
                        CasinoRoomCound[gameId]--;
                    }

                    if (CasinoRoomCound[gameId] === 0 && Casinointervals[gameId]) {
                        // clearInterval(Casinointervals[gameId]);
                        delete Casinointervals[gameId];
                    }
                } catch (error) {
                    const errorMessage = `Error leaving casino room for gameId ${gameId}: ${error.message}`;
                    console.error(errorMessage);
                    logError(errorMessage);
                }
            });

            AndarBaharManual.SetFirstCard(io)
            socket.on("disconnect", () => {
                // console.log("A user disconnected", socket.id);

                // Clear all intervals for this socket
                Object.keys(roomCounts).forEach((matchId) => {
                    if (roomCounts[matchId]) {
                        roomCounts[matchId]--;
                    }

                    if (roomCounts[matchId] === 0 && intervals[matchId]) {
                        clearInterval(intervals[matchId]);
                        delete intervals[matchId];
                    }
                });
            });
        } catch (error) {
            const errorMessage = `Error handling socket connection: ${error.message}`;
            console.error(errorMessage);
            logError(errorMessage);
        }
    });

    return io;
};

module.exports = setupSocket;
