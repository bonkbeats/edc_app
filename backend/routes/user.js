const express = require('express')


const router = express.Router()
const { userdashboard} = require('../controllers/user')


router.get('/',userdashboard)

//router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router


//just for testing