const app = require('express')
const router = app.Router()
const staffController = require('../controllers/staff.controller')

router.post('/create-staff', staffController.createStaff)
router.post('/get-staff', staffController.getAllStaff)

module.exports = router