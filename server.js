const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const connectDB = require('./app/config/DBConfig')
app.use(express.json())
app.use(cors());
const port = process.env.PORT

// Admin
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Users/routes/CreateUser.routes"))
app.use(process.env.ADMIN_ROUTES, require('./app/admin/Login/routes/AdminLogin.routes'))
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Role/Role.routes"))
app.use(process.env.ADMIN_ROUTES, require("./app/admin/Limit/limit.routes"))

// website
app.use(process.env.WEBSITE_ROUTES,require("./app/website/Profile/Profile.routes"))
app.use(process.env.WEBSITE_ROUTES,require("./app/website/login/Login.routes"))
app.use(process.env.WEBSITE_ROUTES,require('./app/website/inplay/match.routes'))


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, async () => {
  await connectDB()
  console.log(`http://localhost:${port} server is running`)
})