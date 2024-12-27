const express = require('express')
const router = express.Router()
const { 
 
   getAllEvent,
  
   getEvent,
} = require('../controllers/public_event')


router.route('/').get(getAllEvent)

router.route('/:id').get(getEvent)

module.exports = router


//just for testing