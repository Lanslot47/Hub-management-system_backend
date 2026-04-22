const app = require('express')
const router = app.Router()
const studentController = require('../controllers/student.controller')

router.post('/create-student', studentController.createStudent)
router.post('/add-payment', studentController.addPayment)
router.put('/update-student', studentController.updateStudent)
router.get('/get-student', studentController.getAllStudent)

module.exports = router