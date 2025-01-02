   

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

    const searchevent = async (req,res) => {
      const {name} = req.query;
      if (!name) {
        return res.status(400).json({ error: 'Event name is required' });
      }
      try {
        const events = await Event.find({
          eventname: { $regex: name, $options: 'i' },
        });
        res.status(200).json(events);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
      }
    }
    
 
module.exports = {
 
  getAllEvent,
  getEvent,
  searchevent,
 
   
 }