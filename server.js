require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;
const mongoose = require('mongoose')
const mongodbUrl = process.env.mongodbUrl
const reportRoute = require('./src/routes/report.route')
const studentRoute = require('./src/routes/student.route')
const staffRoute = require('./src/routes/staff.route')
const dashboardRoute = require("./src/routes/dashboard.route")
const paymentRoute = require("./src/routes/payment.route")
const authRoute = require("./src/routes/auth.route")
app.use(express.json())
app.use(cors({
    origin: "*"
}))
mongoose.connect(mongodbUrl)
    .then(() => console.log('database connected'))
    .catch((error) => console.log(`mongoDb connection ${error}`))

app.use('/api', reportRoute)
app.use("/api", dashboardRoute)
app.use('/api', studentRoute)
app.use('/api', staffRoute)
app.use('/api', paymentRoute)
app.use('/api', authRoute)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})