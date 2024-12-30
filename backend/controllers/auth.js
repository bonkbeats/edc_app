const  User = require('../models/auth')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')



//User here is created in the database 
const register =  async (req,res) => {
   const user =await User.create({...req.body})
   const token = user.createJwt();
   res
   .status(StatusCodes.CREATED)
   .json({ user :  {name:user.name ,role: user.role},token})
   
}



const login = async (req, res) => {
   const { email, password } = req.body
 
   if (!email || !password) {
     throw new BadRequestError('Please provide email and password')
   }
   const user = await User.findOne({ email })
   if (!user) {
     throw new UnauthenticatedError('Invalid Credentials')
   }
   const isPasswordCorrect = await user.comparePassword(password)
   if (!isPasswordCorrect) {
     throw new UnauthenticatedError('Invalid Credentials')
   }
   // compare password
   const token = user.createJwt();
   res.status(StatusCodes.OK).json({ user: { name: user.name, role: user.role  }, token })
 }


 

 


module.exports ={
   register,
   login
}