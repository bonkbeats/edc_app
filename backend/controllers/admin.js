   

   const Event = require('../models/event')
   const { StatusCodes } = require('http-status-codes')
    const { BadRequestError, NotFoundError } = require('../errors')
    const multer = require('multer');
    const path = require('path');





// Create event controller
const createEvent = async (req, res) => {
  try {
    // Check if the file is uploaded and set the image URL
    let image = null;
    if (req.file) {
      image = `/images/${req.file.filename}`;  // Relative URL for the image
      console.log('File uploaded to:', path.join(__dirname, '../public/images', req.file.filename)); // Log the full path
    }

    // Create a new event with the provided details
    const event = await Event.create({
      eventname: req.body.eventname,
      location: req.body.location,
      description:req.body.description,
      organiser:req.body.organiser,
      eventDate:req.body.eventDate,
      eventDay:req.body.eventDay,
      


      image: image, // Store the image URL (relative path) in the database
    });
   


    // Send response with the created event
    res.status(StatusCodes.CREATED).json({ event });
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

   
   
  //  const createEvent = async (req, res) => {
  //    const event = await Event.create(req.body)
  //    res.status(StatusCodes.CREATED).json({event})
 
  //   }


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

    // const path = require('path'); // Ensure path is imported if not already

const updateEvent = async (req, res) => {
  try {
    console.log('Received request to update event:', req.body);

    const {
      body: { eventname, location ,eventDate,eventDay,description},
      params: { id: eventId },
    } = req;

    // Validate required fields
    if (!eventname || !location || !eventDate || !eventDay ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Event name and location are required.' });
    }

    // Check if a new image file is uploaded
    let updatedData = {
      eventname,
      location,
      eventDate,
      eventDay,
      description
     
    };

    if (req.file) {
      // If a new file is uploaded, update the image field
      updatedData.image = `/images/${req.file.filename}`; // Relative URL for the new image
      console.log('File uploaded to:', path.join(__dirname, '../public/images', req.file.filename)); // Log the full path
    }

    // Update the event in the database
    const event = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
      runValidators: true,
    });

    // Handle case where the event is not found
    if (!event) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No event found with id ${eventId}` });
    }

    // Respond with the updated event
    res.status(StatusCodes.OK).json({ event });
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    console.error('Error updating event:', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

    
    // const updateEvent = async (req, res) => {
    //   console.log('Received request to update event:', req.body);
    //   const {
    //     body: { eventname, location },
       
    //     params: { id: eventId },
    //   } = req
    
    //   if (eventname === '' || location === '') {
    //     throw new BadRequestError('Company or Position fields cannot be empty')
    //   }
    //   const event = await Event.findByIdAndUpdate(
    //     { _id: eventId },
    //     req.body,
    //     { new: true, runValidators: true }
    //   )
    //   if (!event) {
    //     throw new NotFoundError(`No job with id ${eventId}`)
    //   }
    //   res.status(StatusCodes.OK).json({ event })
  
    // }

 
module.exports = {
  createEvent,
  getAllEvent,
  getEvent,
  deleteEvent,
  updateEvent,
   
 }