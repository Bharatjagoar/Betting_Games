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
      url: `http://142.93.36.1/api/v2/score?EventTypeID=4&matchId=${matchId}`,
      headers: {},
    };

    const scorecboard = await axios(scoreconfig);
    const scorecboardData = scorecboard.data;

    // Emit updated data
    io.emit("receiveData", { fetchedData, MatchOdds, scorecboardData });
  } catch (error) {
    console.error("Error updating session odds:", error.message);
    io.emit("error", { message: "Error updating session odds", error: error.message });
  }
};

const UserProfile = (io) => {
  try {
    const userProfile = {
      name: "User Name",
      coins: Math.floor(Math.random() * 100), // Generate random coins value
      expor: "User Exp", // Or generate a random value if needed
    };
    io.emit("UserProfile", userProfile); // Emit the updated userProfile data
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    io.emit("error", { message: "Error updating user profile", error: error.message });
  }
};

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const matchId = 33433284;
    const marketId = 1.230919825;

    try {
      const updateInterval = setInterval(
        () => updateSessionOdds(io, matchId, marketId),
        1000
      );

      socket.on("UserId", (data) => {
        try {
          const userProfileInterval = setInterval(() => UserProfile(io), 8000); // Update every 8 seconds

          socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            clearInterval(updateInterval);
            clearInterval(userProfileInterval);
          });
        } catch (error) {
          console.error("Error handling UserId event:", error.message);
          io.emit("error", { message: "Error handling UserId event", error: error.message });
        }
      });
    } catch (error) {
      console.error("Error setting up intervals:", error.message);
      io.emit("error", { message: "Error setting up intervals", error: error.message });
    }
  });

  return io;
};

module.exports = setupSocket;
