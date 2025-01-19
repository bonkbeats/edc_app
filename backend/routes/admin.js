const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const { 
   createEvent,
   deleteEvent,
   getAllEvent,
   updateEvent,
   getEvent,
} = require('../controllers/admin')

const {
  createProfile,
  getAllProfile,
  deleteProfile,
  updateProfile
}= require('../controllers/edc_team')


// Multer configuration for image upload
// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//      cb(null, path.join(__dirname, '../public/images'));
//    },
//    filename: (req, file, cb) => {
//      cb(null, Date.now() + path.extname(file.originalname)); // Timestamp to avoid name conflicts
//    },
//  });
const storage = multer.memoryStorage();
 const upload = multer({ storage: storage });
 

router.route('/profile/:id').delete(deleteProfile).get(getAllProfile).patch(upload.single('image'),updateProfile)
router.route('/profile').post(upload.single('image'),createProfile).get(getAllProfile)
router.route('/').post(upload.single('image'),createEvent).get(getAllEvent)
router.route('/:id').get(getEvent).delete(deleteEvent).patch(upload.single('image'),updateEvent)


module.exports = router


//just for testing