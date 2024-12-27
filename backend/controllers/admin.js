   

   const Event = require('../models/event')
   const { StatusCodes } = require('http-status-codes')
    const { BadRequestError, NotFoundError } = require('../errors')

   
   
   const createEvent = async (req, res) => {
     const event = await Event.create(req.body)
     res.status(StatusCodes.CREATED).json({event})
 
    }


    const deleteEvent = async (req, res) => {
      console.log('Received request to delete event:', req.body);
      const {
        params: { id: eventId },
      } = req;
    
      try {
        const event = await Event.findByIdAndDelete({ _id: eventId });
    
        if (!event) {
          throw new NotFoundError(`No event found with ID ${eventId}`);
        }
    
        res.status(StatusCodes.OK).json({ event });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      }
     
     

    }
    

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
    
    const updateEvent = async (req, res) => {
      console.log('Received request to update event:', req.body);
      const {
        body: { eventname, location },
       
        params: { id: eventId },
      } = req
    
      if (eventname === '' || location === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }
      const event = await Event.findByIdAndUpdate(
        { _id: eventId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!event) {
        throw new NotFoundError(`No job with id ${eventId}`)
      }
      res.status(StatusCodes.OK).json({ event })
  
    }

 
module.exports = {
  createEvent,
  getAllEvent,
  getEvent,
  deleteEvent,
  updateEvent,
   
 }