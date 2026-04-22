const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;
const mongoose = require('mongoose')
const mongodbUrl = "mongodb://localhost:27017/SMS";
const reportRoute = require('./src/routes/report.route')
const studentRoute = require('./src/routes/student.route')
const staffRoute = require('./src/routes/staff.route')
app.use(express.json())
mongoose.connect(mongodbUrl)
    .then(() => console.log('database connected'))
    .catch((error) => console.log(`mongoDb connection ${error}`))

app.use('/api', reportRoute)
app.use('/api', studentRoute)
app.use('/api', staffRoute)
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})