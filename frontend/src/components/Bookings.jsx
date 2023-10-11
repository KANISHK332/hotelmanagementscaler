import React, { useEffect, useState } from "react";
import "./css/bookings.css";
import {
  addBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "../actions/bookingAction";
import Modal from "react-modal";
import { getRooms } from "../actions/roomAction";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    borderRadius: "10px",
    border: "5px solid black",
  },
};

function Bookings() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    userEmail: "",
    room: "",
    startTime: "",
    endTime: "",
    price: "",
  });
  const [actionType, setActionType] = useState("add");
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllBookings = async () => {
    const data = await getBookings();
    setData(data);
    console.log(data);
  };

  const getAllRooms = async () => {
    const data = await getRooms();
    setRoomData(data);
    console.log(data);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  //   useEffect(() => {
  //     if (bookingDetails.room) {
  //         const selectedRoom = roomData.find(room => room._id === bookingDetails.room);
  //         if (selectedRoom) {
  //             setBookingDetails(prev => ({ ...prev, price: selectedRoom.pricePerHour }));
  //         }
  //     }
  // }, [bookingDetails.room, roomData]);

  const getRoomTypefromId = (id) => {
    const selectedRoom = roomData.find((room) => room._id === id);
    if (selectedRoom) {
      return selectedRoom.roomType;
    }
    return "";
  };

  const createNewBooking = async (e) => {
    e.preventDefault();
    console.log(actionType);
    if (actionType === "add") {
      setLoading(true);
      const res = await addBooking(bookingDetails);
      setLoading(false);
      console.log(res);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("reservation added");
      }
    } else {
      setLoading(true);
      const res = await updateBooking(bookingDetails, bookingId);
      setLoading(false);
      console.log(res);
      // if (res.error) {
      //   toast.error(res.error);
      // } else {
        toast.success("reservation updated");
      // }
    }
    await getAllBookings();
    closeModal();
  };

  const cancelBooking = async (id) => {
    setLoading(true);
    const res = await deleteBooking(id);
    setLoading(false);
    if (res) {
      toast.success("reservation deleted");
    }
    console.log(res);
    getAllBookings();
  };

  const updateBookingFunc = async (id) => {
    await setActionType("update");
    setBookingId(id);
    openModal();
  };

  const addBookingFunc = async () => {
    setActionType("add");
    openModal();
  }

  useEffect(() => {
    getAllRooms();
    getAllBookings();
  }, []);

  return (
    <>
      <div className="bookTableCont">
        <h1 className="booksHeader">Booking Counter</h1>
        <div className="bkTable">
          <table className="bkCntTable">
            <tr>
              <th>User Email</th>
              <th>Room No.</th>
              <th>Starting Time</th>
              <th>Ending Time</th>
              <th>Price</th>
              {/* <th>Updatation</th> */}
            </tr>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userEmail}</td>
                  <td>{item.room.roomType}</td>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                  <td>{item.price}</td>
                  {/* <td>{item._id}</td> */}
                  <td>
                    <button
                      className="updateBtn"
                      onClick={() => updateBookingFunc(item._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="updateBtn"
                      onClick={() => cancelBooking(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>

        <div className="bookBtn">
          <button onClick={addBookingFunc}>Book Room</button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Booking Modal"
      >
        <h2 className="bkModalAdd">
          {actionType === "add" ? "Add Booking" : "Update Booking"}
        </h2>
        <form className="modalForm">
          <div className="bkInput">
            <label className="modalLabel">Email:</label>
            <input
              type="email"
              name="userEmail"
              value={bookingDetails.userEmail}
              onChange={handleChange}
              required
              className="modalInput"
            />
          </div>
          <div className="bkInput">
            <label className="modalLabel">Room:</label>
            <select
              name="room"
              value={bookingDetails.room}
              onChange={handleChange}
              required
              className="modalInput"
            >
              <option value="">Select a room</option>
              {roomData.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomType}
                </option>
              ))}
            </select>
          </div>
          <div className="bkInput">
            <label className="modalLabel">Start Time:</label>
            <input
              type="datetime-local"
              name="startTime"
              value={bookingDetails.startTime}
              onChange={handleChange}
              required
              className="modalInput"
            />
          </div>
          <div className="bkInput">
            <label className="modalLabel">End Time:</label>
            <input
              type="datetime-local"
              name="endTime"
              value={bookingDetails.endTime}
              onChange={handleChange}
              required
              className="modalInput"
            />
          </div>
          <div className="bkInput">
            <button onClick={createNewBooking} className="sbmtModal">
              {actionType === "add" ? (loading ? "Adding..." : "Add Booking") : (loading ? "Updating..." : "Update Booking")}
            </button>
            <button type="button" className="sbmtModal" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Bookings;
