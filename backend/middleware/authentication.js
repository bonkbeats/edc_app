const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async(req , res , next) =>{

   const authHeader = req.headers.authorization
   if(!authHeader || !authHeader.startswith('Bearer')){
      throw new UnauthenticatedError(
         'Authentication error'
      )
   }
      const token = authHeader.split(' ')[1]

      try {
         const payload = jwt.verify(token,'jwtSecret')
         req.user = {userId: payload.userId , name: payload.name}
         next()
         
      } catch (error) {
         throw new UnauthenticatedError('Authentication invalid')
         
      }
   }
   module.exports = auth

