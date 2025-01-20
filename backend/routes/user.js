const express = require('express')


const router = express.Router()
const { createTeam , getTeamsByUser} = require('../controllers/user')


router.post('/',createTeam).get('/',getTeamsByUser)

//router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router


//just for testing