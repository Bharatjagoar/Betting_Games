var axios = require("axios");
const socketIo = require("socket.io");

// Initial sample data
let session_odds = [
  {
    team_batting: "0",
    title: "1st Inn 0 to 20 overs Total Sixes PBKS adv",
    back_condition: "118",
    back: "100",
    lay_condition: "6",
    lay: "100",
    status: "",
  },
  {
    team_batting: "0",
    title: "1st Inn 0 to 20 overs Total Fours PBKS adv",
    back_condition: "16",
    back: "100",
    lay_condition: "14",
    lay: "100",
    status: "",
  },
  {
    team_batting: "0",
    title: "1st Inn 0 to 20 overs Total 2 runs PBKS adv",
    back_condition: "11",
    back: "100",
    lay_condition: "9",
    lay: "100",
    status: "",
  },
  {
    team_batting: "0",
    title: "1st Inn 0 to 20 overs Total 1 runs PBKS adv",
    back_condition: "49",
    back: "100",
    lay_condition: "47",
    lay: "100",
    status: "",
  },
];

// Function to generate random number between 0 and 100
const generateRandomNumber = () => Math.floor(Math.random() * 101);

const updateSessionOdds = async (io, matchId, marketId) => {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://142.93.36.1/api/v2/getSessions?EventTypeID=4&matchId=${matchId}`,
      headers: {},
    };

    const response = await axios(config);
    const fetchedData = response.data;

    console.log(JSON.stringify(fetchedData));
    
    var Oddsconfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://142.93.36.1/api/v2/getMarketsOdds?EventTypeID=4&marketId=${marketId}`,
      headers: {},
    };

    const Oddsdata = await axios(Oddsconfig);
    const MatchOdds = Oddsdata.data;

    console.log(JSON.stringify(fetchedData));


    // Emit updated data
    io.emit("receiveData", {fetchedData,MatchOdds});
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
    const matcbId = 33433287;
    const marketId = 1.230919732;
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
