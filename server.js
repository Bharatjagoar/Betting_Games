const express = require('express')
const app = express()
const CreateAdmin = require("./app/admin/Users/routes/CreateUser.routes")
const port = 5000
const connectDB = require('./app/config/DBConfig')
const AdminLogin = require('./app/admin/AdminLogin/routes/AdminLogin.routes')
app.use(express.json())

app.use("/api/v1", CreateAdmin)
app.use("/api/v1", AdminLogin)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, async () => {
  await connectDB()
  console.log(`http://localhost:${port} server is running`)
})