var axios = require("axios");
const socketIo = require("socket.io");


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
    io.emit("receiveData", {fetchedData,MatchOdds,scorecboardData});
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
