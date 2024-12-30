const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({

   //The required property in Mongoose schema definitions is used to enforce a validation rule that ensures a particular field is always present when creating or saving a document. If the field is missing, Mongoose will throw a validation error.

   name :{
      type:String,
      required : [ true , 'please provide the name '],
   },

   email:{
      type: String,
      required:[
         true,'pleasee provide email'
      ],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Please provide a valid email',
       ],
       unique: true, // not a validaor

   },

   password :{
      type:String,
      required:[ true,'please provide password'],
      minlength: 6,
   },
   role: {
      type: String,
      enum: ['user', 'admin'], // Only allow 'user' or 'admin'
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

   
})

// Hash the password before saving
UserSchema.pre('save', async function () {
   if (!this.isModified('password')) return; // Only hash the password if it's modified
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.pre('save', async function () {

//    const salt = await bcrypt.genSalt(10);
//    this.password = await bcrypt.hash(this.password , salt)
  

//    // the set of line hash the password before saving it into the database.

// })

//creating token
UserSchema.methods.createJwt = function () {
   return jwt.sign({userId : this._id, name:this.name,role: this.role }, 'jwtSecret' , {expiresIn :'30d'})
}


UserSchema.methods.comparePassword = async function (canditatePassword) {
   const isMatch = await bcrypt.compare(canditatePassword, this.password)
   return isMatch
 }


module.exports = mongoose.model('user', UserSchema)
// 'user' is the name of the collection in mongodb ,if not present will be created.