




const Team = require('../models/teams');

const createTeam = async (req, res) => {
   try {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
     // Extracting team name and email IDs from the request body
     const { teamName, emailIds,eventName } = req.body;
 
     // Validate that at least one email ID is provided
     if (!emailIds || emailIds.length === 0 || !eventName) {
       return res.status(400).json({ message: 'At least one email ID is required.' });
     }
 
     // Create a new team instance
     const team = new Team({ teamName, emailIds ,eventName,
      userId: req.user.userId, 
     });
 
     // Save the team to the database
     await team.save();
     console.log(team)
 
     // Respond with the ID of the newly created team
     res.status(201).json({ teamId: team._id, message: 'Team  created successfully' , event:eventName  });
   } catch (error) {
     // Handle errors, such as validation errors or unique constraint violations
     res.status(400).json({ message: error.message });
   }
 };
 


const getTeamsByUser = async (req, res) => {
   try {
      // Ensure the user is authenticated and has a valid userId
      if (!req.user || !req.user.userId) {
         return res.status(401).json({ message: 'User is not authenticated' });
      }

      // Fetch teams associated with the logged-in user
      const teams = await Team.find({ userId: req.user.userId });

      // If no teams are found
      // if (teams.length === 0) {
      //    return res.status(404).json({ message: 'No teams found for this user' });
      // }

            // Handle the case where no teams are found
            if (teams.length === 0) {
               return res.status(200).json({ teams: [], message: 'No teams found for this user.' });
            }
      

      // Respond with the teams data
      res.status(200).json({ teams });
   } catch (error) {
      // Handle errors, such as database issues
      res.status(500).json({ message: 'An error occurred while retrieving the teams' });
   }
};
 module.exports = {
   createTeam,
   getTeamsByUser
 };