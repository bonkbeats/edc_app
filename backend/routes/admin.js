const express = require('express')
const router = express.Router()
const { 
   createEvent,
   deleteEvent,
   getAllEvent,
   updateEvent,
   getEvent,
} = require('../controllers/admin')


router.route('/').post(createEvent).get(getAllEvent)

router.route('/:id').get(getEvent).delete(deleteEvent).patch(updateEvent)

module.exports = router


//just for testing