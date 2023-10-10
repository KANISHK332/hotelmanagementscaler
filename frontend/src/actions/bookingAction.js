import axios from 'axios';

//get all bookings
export const getBookings = async() => {
    try {
        const { data } = await axios.get('/api/bookings');
        return data;
    } catch (error) {
        console.log(error);
    }
};

//create new booking
export const addBooking = async(booking) => {
    try {
        const res = await axios.post('/api/bookings', booking);
        if(res.status === 201){
            return res.data;
        }
        if(res.status === 400){
            return {error: res.data.error};
        }
    } catch (error) {
        console.log(error.response.data.error);
        return {error: error.response.data.error};
    }
};

//update booking status
export const updateBooking = async(booking, id) => {
    try {
        const res = await axios.put(`/api/bookings/${id}`, booking);
        if(res.status === 200){
            return res.data;
        }
        if(res.status === 400){
            return {error: res.data.error};
        }
    } catch (error) {
        console.log(error);
    }
};

//delete booking
export const deleteBooking = async(id) => {
    try {
        const res = await axios.delete(`/api/bookings/${id}`);
        if(res.status === 200){
            return res.data;
        }
        if(res.status === 400){
            return {error: res.data.error};
        }
    } catch (error) {
        console.log(error);
    }
};