const express = require('express')
const router = express.Router()
const { 
 
   getAllEvent,
   searchevent,
  
   getEvent,
} = require('../controllers/public_event')


router.route('/').get(getAllEvent)
router.route('/search').get(searchevent)

router.route('/:id').get(getEvent)


module.exports = router


//just for testing