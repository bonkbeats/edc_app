   

   const Profile = require('../models/edc_team')
   const { StatusCodes } = require('http-status-codes')
    const { BadRequestError, NotFoundError } = require('../errors')

   



    const fetchAllProfile= async (req, res) => {
      const profiles = await Profile.find({});
      res.status(StatusCodes.OK).json({ profiles, count: profiles.length });
    }


    const fetchProfile = async (req, res) => {
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



    const searchProfile = async (req,res) => {
      const {name} = req.query;
      if (!name) {
        return res.status(400).json({ error: 'profile name is required' });
      }
      try {
        const profiles = await Profile.find({
          name: { $regex: name, $options: 'i' },
        });
        res.status(200).json(profiles);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
      }
    }
    
 
module.exports = {
 
  fetchAllProfile,
  fetchProfile,
  searchProfile,
 
   
 }