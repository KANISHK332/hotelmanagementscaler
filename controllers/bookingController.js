const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const sendEmail = require("../utils/sendEmail");

exports.getAllBookings = async (req, res) => {
  const filters = {};
  if (req.query.room) filters.room = req.query.room;
  if (req.query.startTime) filters.startTime = { $gte: req.query.startTime };
  if (req.query.endTime) filters.endTime = { $lte: req.query.endTime };

  const bookings = await Booking.find(filters).populate("room");
  res.json(bookings);
};

exports.bookRoom = async (req, res) => {
  const room = await Room.findById(req.body.room);
  const price = Math.round(
    (room.pricePerHour *
      (new Date(req.body.endTime) - new Date(req.body.startTime))) /
      (1000 * 60 * 60)
  );

  const booking = new Booking({ ...req.body, price });
  room.roomCount -= 1;
  await room.save();
  await booking.save();

  const message = `Your room ${room.roomNumber} is booked from ${req.body.startTime} to ${req.body.endTime}. Total price: ${price} Rs.`;

  sendEmail({
    email: req.body.userEmail,
    subject: "Room Booking Confirmation",
    message,
  });

  res.status(201).json(booking);
};

exports.editBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  const room = await Room.findById(req.body.room);
  const price = Math.round(
    (room.pricePerHour *
      (new Date(req.body.endTime) - new Date(req.body.startTime))) /
      (1000 * 60 * 60)
  );

  booking.userEmail = req.body.userEmail;
  booking.room = req.body.room;
  booking.startTime = req.body.startTime;
  booking.endTime = req.body.endTime;
  booking.price = price;

  await booking.save();

  const message = `Your room booking is updated. Room ${room.roomNumber} from ${req.body.startTime} to ${req.body.endTime}. Total price: ${price} Rs.`;

  sendEmail({
    email: req.body.userEmail,
    subject: "Room Booking Updation",
    message,
  });

  res.json(booking);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    const usermail = booking.userEmail;
    const hoursBeforeStart =
      (new Date(booking.startTime) - new Date()) / (1000 * 60 * 60);
    let refund = 0;
    if (hoursBeforeStart > 48) {
      refund = booking.price;
    } else if (hoursBeforeStart <= 48 && hoursBeforeStart >= 24) {
      refund = booking.price * 0.5;
    }

    const room = await Room.findById(booking.room);
    room.roomCount += 1;
    await room.save();

    await Booking.findByIdAndRemove(req.params.id);

    const message = `Your room booking is cancelled. Refund amount: ${refund} Rs.`;

    sendEmail({
      email: usermail,
      subject: "Room Booking Cancelation",
      message,
    });

    res.json({ message: "Booking cancelled", refund });
  }
};
