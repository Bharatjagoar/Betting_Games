const express = require('express')
const http = require('http');
require('dotenv').config()
const cors = require('cors');
const connectDB = require('./app/config/DBConfig')
const app = express();
const server = http.createServer(app);
app.use(express.json())
app.use(cors());
const setupSocket = require('./Socket/socket');
const port = process.env.PORT

// Admin
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Users/routes/CreateUser.routes"))
app.use(process.env.ADMIN_ROUTES, require('./app/admin/Login/routes/AdminLogin.routes'))
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Role/Role.routes"))
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Limit/limit.routes"))
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Ledger/routes/ledger.routes"));
app.use(process.env.ADMIN_ROUTES, require("./app/admin/statements/routes/Statement.routes"));
app.use(process.env.ADMIN_ROUTES,require("./app/admin/AccountOperations/routes/transaction.routes"));
app.use(process.env.ADMIN_ROUTES, require("./app/admin/matchLedger/routes/match.routes"));

// website
app.use(process.env.WEBSITE_ROUTES,require("./app/website/Profile/Profile.routes"))
app.use(process.env.WEBSITE_ROUTES,require("./app/website/login/Login.routes"))
app.use(process.env.WEBSITE_ROUTES,require('./app/website/inplay/match.routes'))
app.use(process.env.WEBSITE_ROUTES,require("./app/website/statements/routes/Statement.routes"));
app.use(process.env.WEBSITE_ROUTES,require("./app/website/matchList/Match.routes"));
app.use(process.env.WEBSITE_ROUTES,require("./app/website/ludo/baseRoute"));
app.use(process.env.WEBSITE_ROUTES,require("./app/website/RolletGame/BaseRoute"));





app.get('/', function (req, res) {
  res.send('Hello World')
})

// Set up Socket.io
setupSocket(server);

server.listen(port, async () => {
  await connectDB()
  console.log(`http://localhost:${port} server is running`)
})