const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError ,UnauthorizedError} = require('../errors')

const auth = async(req , res , next) =>{
  


   const authHeader = req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer')){
      throw new UnauthenticatedError(
         'Authentication error'
      )
   }
      const token = authHeader.split(' ')[1]
      console.log(token)

      try {
         const payload = jwt.verify(token,'jwtSecret')

         req.user = {userId: payload.userId , name: payload.name ,role: payload.role}
         console.log('Decoded token:', req.user);
         console.log('Decoded token:', req.user.userId);
         next()
         
      } catch (error) {
         console.log(error)
         throw new UnauthenticatedError('Authentication invalid')
         
      }
   }

   
   // Authorization Middleware
const authorizeRoles = (...roles) => {
   

   return (req, res, next) => {
      
     if (!roles.includes(req.user.role)) {
       throw new UnauthorizedError('Not authorized to access this route');
     }
     console.log('User role:', req.user.role);
     next();
   };
 };
 
   module.exports =   { auth, authorizeRoles };



   