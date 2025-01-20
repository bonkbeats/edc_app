const mongoose = require('mongoose');

// Define the schema for the team
const teamSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  emailIds: {
    type: [String],
    validate: [
      {
        validator: function(value) {
          return value.length <= 4; // Allow up to 4 email IDs
        },
        message: 'A team can have a maximum of 4 email IDs.',
      },
    ],
  },
  userId: {
   type: mongoose.Schema.Types.ObjectId, 
   ref: 'Users', // Reference to the 'User' model
   required: true, // Ensure that the userId is required when creating a team
 },
});


// Create the model from the schema
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
