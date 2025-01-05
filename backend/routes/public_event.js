const express = require('express')
const router = express.Router()
const { 
   getAllEvent,
   searchevent,
    getEvent,
} = require('../controllers/public_event')





const {fetchAllProfile , fetchProfile, searchProfile} = require('../controllers/public_profile')


router.route('/profile').get(fetchAllProfile)
router.route('/profile/search').get(searchProfile)
router.route('/profile/:id').get(fetchProfile)

router.route('/').get(getAllEvent)
router.route('/search').get(searchevent)
router.route('/:id').get(getEvent)


module.exports = router


//just for testing