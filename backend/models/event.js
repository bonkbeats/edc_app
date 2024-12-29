const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
   {
      eventname:{
         type :String,
         required :[true ,'please provide event name'],
        
      },
      location: {
         type:String,
         required:[true, 'please provide the location'],
       

      },
      image:{
         type:String,
         required:false
      }
   },
   { timestamps: true }
)


module.exports = mongoose.model('event', eventSchema)