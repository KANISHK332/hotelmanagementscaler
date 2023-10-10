const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const bookingController = require('../controllers/bookingController');
const checkAvailability = require('../middleware/checkAvailability');

router.get('/rooms', roomController.getAllRooms);
router.post('/rooms', roomController.addRoom);

router.get('/bookings', bookingController.getAllBookings);
router.post('/bookings', checkAvailability, bookingController.bookRoom);
router.put('/bookings/:id', checkAvailability, bookingController.editBooking);
router.delete('/bookings/:id', bookingController.cancelBooking);

module.exports = router;
