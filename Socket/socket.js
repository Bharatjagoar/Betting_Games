const socketIo = require('socket.io');

// Initial sample data
let session_odds = [
    {
        "team_batting": "0",
        "title": "1st Inn 0 to 20 overs Total Sixes PBKS adv",
        "back_condition": "118",
        "back": "100",
        "lay_condition": "6",
        "lay": "100",
        "status": ""
    },
    {
        "team_batting": "0",
        "title": "1st Inn 0 to 20 overs Total Fours PBKS adv",
        "back_condition": "16",
        "back": "100",
        "lay_condition": "14",
        "lay": "100",
        "status": ""
    },
    {
        "team_batting": "0",
        "title": "1st Inn 0 to 20 overs Total 2 runs PBKS adv",
        "back_condition": "11",
        "back": "100",
        "lay_condition": "9",
        "lay": "100",
        "status": ""
    },
    {
        "team_batting": "0",
        "title": "1st Inn 0 to 20 overs Total 1 runs PBKS adv",
        "back_condition": "49",
        "back": "100",
        "lay_condition": "47",
        "lay": "100",
        "status": ""
    },
];

// Function to generate random number between 0 and 100
const generateRandomNumber = () => Math.floor(Math.random() * 101);

// Function to update session odds with random values
const updateSessionOdds = (io) => {
    session_odds = session_odds.map(odds => ({
        ...odds,
        back_condition: generateRandomNumber(),
        back: generateRandomNumber(),
        lay_condition: generateRandomNumber(),
        lay: generateRandomNumber()
    }));
    io.emit('receiveData', session_odds);
};

// Function to reset session odds to zero
const resetSessionOddsToZero = (io) => {
    session_odds = session_odds.map(odds => ({
        ...odds,
        back_condition: 0,
        back: 0,
        lay_condition: 0,
        lay: 0
    }));
    io.emit('receiveData', session_odds);
};

const UserProfile = (io) => {
  
    const userProfile = {
      name: 'User Name',
      coins: Math.floor(Math.random() * 100), // Generate random coins value
      expor: 'User Exp' // Or generate a random value if needed
    };
    io.emit('UserProfile', userProfile); // Emit the updated userProfile data
   // Update every 8 seconds

}

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Adjust this according to your frontend's origin
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        // Set up intervals for updating and resetting odds
        const updateInterval = setInterval(() => updateSessionOdds(io), 8000); // Update every 8 seconds
        const resetInterval = setInterval(() => resetSessionOddsToZero(io), 10000); // Reset every 10 seconds

        socket.on('UserId', (data) => {
          console.log(data)
          console.log(socket.id)
          
          setInterval(() => UserProfile(io), 1000); // Update every 8 seconds
        });


        
        // Handle incoming data and broadcast it
        // socket.on('sendData', (data) => {
        //     io.emit('receiveData', data);
        // });



        socket.on('disconnect', () => {
            console.log('A user disconnected');
            clearInterval(updateInterval);
            clearInterval(resetInterval);
        });
    });

    return io;
};

module.exports = setupSocket;
