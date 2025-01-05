const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
   {
      name:{
         type :String,
         required :[true ,'please provide  name'],
        
      },
     
      image:{
         type:String,
         required:false
      },
      position:{
         type :String,
         required :[true ,'please provide your position'],
        
      },
     
       
   },
   { timestamps: true }
)


module.exports = mongoose.model('edc_team', eventSchema)