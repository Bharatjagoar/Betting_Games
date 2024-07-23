var axios = require("axios");
const socketIo = require("socket.io");

const scorecboard = {
    "message": "Match score fetched.",
    "code": 0,
    "error": false,
    "data": {
        "rky": "cricnet_33418377",
        "match_id": "33418377",
        "match_name": "",
        "match_date": "",
        "venue": "",
        "msg": "OI Needed 24 runs from 46 balls",
        "teams": [
            {
                "team_name": "OI",
                "team_short_name": "OI",
                "score": "66-2 (10.4)"
            },
            {
                "team_name": "BP",
                "team_short_name": "BP",
                "score": "89-10 (16.1)"
            }
        ],
        "currentRunRate": "6.11",
        "current_inning": "OI",
        "remaining_overs": 0,
        "requireRunRate": "2.61",
        "runNeeded": 23,
        "ballsRemaining": 0,
        "target": "89",
        "current_over": "(10.4)",
        "current_score": "66-2",
        "current_wickets": "",
        "match_format": "",
        "currentPlayersScore": {
            "Batsman": [
                {
                    "id": 0,
                    "on_play": "*",
                    "player_id": 0,
                    "team_id": 0,
                    "match_id": "",
                    "inning": "",
                    "runs": "0",
                    "balls": "0",
                    "fours": "0",
                    "sixes": "0",
                    "is_out": "0",
                    "out_text": "",
                    "strike_rate": ""
                },
                {
                    "id": 0,
                    "on_play": "",
                    "player_id": 0,
                    "team_id": 0,
                    "match_id": "",
                    "inning": "",
                    "runs": "0",
                    "balls": "0",
                    "fours": "0",
                    "sixes": "0",
                    "is_out": "0",
                    "out_text": "",
                    "strike_rate": ""
                }
            ],
            "partnership": "",
            "lastWicket": "",
            "bowler": ""
        },
        "last24balls": [
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "0",
                "out_text": "0",
                "comment": ""
            },
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "0",
                "out_text": "0",
                "comment": ""
            },
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "",
                "out_text": "",
                "comment": ""
            }
        ],
        "last24ballsNew": [
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "0",
                "out_text": "0",
                "comment": ""
            },
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "0",
                "out_text": "0",
                "comment": ""
            },
            {
                "score_card": "1",
                "out_text": "1",
                "comment": ""
            },
            {
                "score_card": "",
                "out_text": "",
                "comment": ""
            }
        ],
        "completed_message": ""
    },
    "iframeUrl": "https://static.stratagem.me/54411848/tracker.html?sportId=4&lang=en&liveEvent=true&providers=Betradar&eventId=49393311"
}

const updateSessionOdds = async (io, matchId, marketId) => {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://142.93.36.1/api/v2/getSessions?EventTypeID=4&matchId=${matchId}`,
      headers: {},
    };

    const response = await axios(config);
    const fetchedDataAPI = response.data;

    const fetchedData = fetchedDataAPI.map((item) => {
      item.gtype = "session";
      return item;
    });
    
    var Oddsconfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://142.93.36.1/api/v2/getMarketsOdds?EventTypeID=4&marketId=${marketId}`,
      headers: {},
    };

    const Oddsdata = await axios(Oddsconfig);
    const MatchOdds = Oddsdata.data;


    var scoreconfig = {
      method: "get",
      maxBodyLength: Infinity,
      // url: `http://142.93.36.1/api/v2/score?EventTypeID=4&matchId=${matchId}`,
      url: `http://142.93.36.1/api/v2/score?EventTypeID=4&matchId=33418377`,
      
      headers: {},
    };

    const scorecboard = await axios(scoreconfig);
    const scorecboardData = scorecboard.data;
    

    // Emit updated data
    io.emit("receiveData", {fetchedData,MatchOdds,scorecboard});
  } catch (error) {
    console.error("Error updating session odds:", error.message);
  }
};

const UserProfile = (io) => {
  const userProfile = {
    name: "User Name",
    coins: Math.floor(Math.random() * 100), // Generate random coins value
    expor: "User Exp", // Or generate a random value if needed
  };
  io.emit("UserProfile", userProfile); // Emit the updated userProfile data
  // Update every 8 seconds
};

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // Adjust this according to your frontend's origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const matcbId = 33418377;
    const marketId = 1.230742187;
    const updateInterval = setInterval(
      () => updateSessionOdds(io, matcbId,marketId),
      1000
    ); 
    socket.on("UserId", (data) => {
      setInterval(() => UserProfile(io), 1000); // Update every 8 seconds
    });

   

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      clearInterval(updateInterval);
      clearInterval(resetInterval);
    });
  });

  return io;
};

module.exports = setupSocket;
