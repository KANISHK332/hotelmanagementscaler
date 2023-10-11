const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

async function checkAvailability(req, res, next) {
    const { room, startTime, endTime } = req.body;

    const overlappingBooking = await Booking.findOne({
        room,
        $and: [
            { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
            { startTime: { $lte: endTime }, endTime: { $gte: endTime } }
        ]
    });

    console.log("room data:- ", req.body)

    if(startTime < Date.now() || endTime < Date.now()){
        return res.status(400).json({ error: 'Room is not available for the given time slot.' });
    }

    if(endTime < startTime){
        return res.status(400).json({ error: 'Please enter a valid time slot.' });
    }

    if (overlappingBooking) {
        return res.status(400).json({ error: 'Room is already booked for the given time slot.' });
    }

    const roomDetails = await Room.findById(room);
    if (roomDetails.roomCount <= 0) {
        return res.status(400).json({ error: 'No rooms of this type are available.' });
    }

    next();
}

module.exports = checkAvailability;
