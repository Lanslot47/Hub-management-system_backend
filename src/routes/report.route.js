const app = require('express')
const router = app.Router()
const reportController = require('../controllers/report.controller')

router.get('/staff-performance', reportController.staffPerformance)
router.get('/student-performance', reportController.studentProgress)

module.exports = router