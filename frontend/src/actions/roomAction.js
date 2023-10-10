import axios from 'axios';

//get all rooms
export const getRooms = async() => {
    try {
        const { data } = await axios.get('/api/rooms');
        return data;
    } catch (error) {
        console.log(error);
    }
};

//add new room
export const addRoom = async(room) => {
    try {
        const { data } = await axios.post('/api/rooms', room);
        return data;
    } catch (error) {
        console.log(error);
    }
};