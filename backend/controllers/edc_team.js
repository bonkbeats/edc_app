const Profile = require('../models/edc_team')
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { BadRequestError, NotFoundError } = require('../errors')






// Create event controller
const createProfile = async (req, res) => {
  try {
   console.log('Request Body:', req.body); 
    // Check if the file is uploaded and set the image URL
    let image = null;
    if (req.file) {
      image = `/images/${req.file.filename}`;  // Relative URL for the image
      console.log('File uploaded to:', path.join(__dirname, '../public/images', req.file.filename)); // Log the full path
    }

    // Create a new event with the provided details
    const profile = await Profile.create({
      name: req.body.name,
      position : req.body.position,
      image: image, // Store the image URL (relative path) in the database
    });
   


    // Send response with the created event
    res.status(StatusCodes.CREATED).json({ profile });
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    console.log(error)
  }
};

 const getAllProfile= async (req, res) => {
      const profiles = await Profile.find({});
      res.status(StatusCodes.OK).json({ profiles, count: profiles.length });
    }

    
    const deleteProfile = async (req, res) => {
      console.log('Received request to delete profile:', req.body);
      const {
        params: { id: profileId },
      } = req;
    
      try {
        const profile = await Profile.findByIdAndDelete({ _id: profileId });
    
        if (!profile) {
          throw new NotFoundError(`No event found with ID ${profileId}`);
        }
    
        res.status(StatusCodes.OK).json({ profile });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      }
     
     

    }

    
    const getProfile = async (req, res) => {
      const {
        params: { id: profileId },
      } = req;
    
      try {
        const profile = await Profile.findOne({ _id: profileId });
    
        if (!profile) {
          throw new NotFoundError(`No event found with ID ${profileId}`);
        }
    
        res.status(StatusCodes.OK).json({ profile });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      }
    };


    
    const updateProfile = async (req, res) => {
      try {
        console.log('Received request to update event:', req.body);
    
        const {
          body: { name, position },
          params: { id: profileId },
        } = req;
    
        // Validate required fields
        if (!name || !position ) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: 'profile name and position are required.' });
        }
    
        // Check if a new image file is uploaded
        let updatedData = {
          name,
          position
        
         
        };
    
        if (req.file) {
          // If a new file is uploaded, update the image field
          updatedData.image = `/images/${req.file.filename}`; // Relative URL for the new image
          console.log('File uploaded to:', path.join(__dirname, '../public/images', req.file.filename)); // Log the full path
        }
    
        // Update the event in the database
        const profile = await Profile.findByIdAndUpdate(profileId, updatedData, {
          new: true,
          runValidators: true,
        });
    
        // Handle case where the event is not found
        if (!profile) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `No event found with id ${profileId}` });
        }
    
        // Respond with the updated event
        res.status(StatusCodes.OK).json({ profile });
      } catch (error) {
        // Handle errors (e.g., validation errors, database errors)
        console.error('Error updating event:', error.message);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
    };

    






module.exports = {
   createProfile,
   getAllProfile,
   deleteProfile,
   getProfile,
   updateProfile
}