   

   const Event = require('../models/event')
   const { StatusCodes } = require('http-status-codes')
    const { BadRequestError, NotFoundError } = require('../errors')

   

    

    const getAllEvent= async (req, res) => {
      const events = await Event.find({});
      res.status(StatusCodes.OK).json({ events, count: events.length });
    }


    const getEvent = async (req, res) => {
      const {
        params: { id: eventId },
      } = req;
    
      try {
        const event = await Event.findOne({ _id: eventId });
    
        if (!event) {
          throw new NotFoundError(`No event found with ID ${eventId}`);
        }
    
        res.status(StatusCodes.OK).json({ event });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      }
    };
    
 
module.exports = {
 
  getAllEvent,
  getEvent,
 
   
 }