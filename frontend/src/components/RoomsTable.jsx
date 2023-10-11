import React, { useEffect, useState } from "react";
import "./css/roomsTable.css";
import Modal from 'react-modal';
import { addRoom, getRooms } from "../actions/roomAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width:"50%",
    height:"50%",
    borderRadius:"10px",
    border:"5px solid black",
  },
};

function RoomsTable() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState({roomType: "", roomCount: 0, pricePerHour: 0});

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    setRoomDetails({...roomDetails, [e.target.name]: e.target.value});
  }

  const [data, setData] = useState([]);

  const getAllRooms = async () => {
    const data = await getRooms();
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    getAllRooms();
    console.log("hello\n", roomDetails);
  }, []);

  const addNewRoom = async (e) => {
    // e.preventDefault();
    console.log(roomDetails);
    const res = addRoom(roomDetails);
    console.log(res);
    await getAllRooms();
    closeModal();
  }

  return (
    <>
    <div className="roomsTableCont">
      <h1 className="roomsHeader">Rooms Counter</h1>
      <div className="rmTable">
        <table className="rmCntTable">
          <tr>
            <th>Rooms</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
          {
            data.map((room) => (
              <tr>
                <td>{room.roomType}</td>
                <td>{room.roomCount}</td>
                <td>{room.pricePerHour}</td>
              </tr>
            ))
          }
        </table>
      </div>

      <div className="addRmBtn">
        <button onClick={openModal}>Add Rooms</button>
      </div>
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <h2 className="bkModalAdd">Add Rooms</h2>
          <form className="modalForm">
            <div className="bkInput">
              <label className="modalLabel">Room Type</label>
              {/* a dropdown which has three types A, B, C */}
              <select name="roomType" onChange={handleChange}>
              <option value="">Select a room</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              
            </div>
            <div className="bkInput">
              <label className="modalLabel">Room Count</label>
              <input type="number" name="roomCount" placeholder="Room Count" onChange={handleChange} className="modalInput"/>
            </div>
            <div className="bkInput">
              <label className="modalLabel">Price Per Hour</label>
              <input type="number" name="pricePerHour" placeholder="Price Per Hour" onChange={handleChange} className="modalInput"/>
            </div>
            <div className="bkInput">
              <button className="sbmtModal" onClick={addNewRoom}>Add Rooms</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default RoomsTable;
