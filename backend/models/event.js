const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
   {
      eventname:{
         type :String,
         required :[false ,'please provide event name'],
        
      },
      location: {
         type:String,
         required:[false, 'please provide the location'],
       

      },
      image:{
         type:String,
        /// required:false
      },
      description:{
         type :String,
         required :[false,'please provide event description'],
        
      },
      organiser:{
         type :String,
         required :[false,'please provide organiser'],
        
      },
      eventDate: {
         type: String,
         required: [false, 'Event date is required']
       },
       
       eventDay: {
         type: String,
         required: [false, 'Event day is required']
       },
       // Time of the event (e.g., "10:00 AM")
       
   },
   { timestamps: true }
)


module.exports = mongoose.model('event', eventSchema)