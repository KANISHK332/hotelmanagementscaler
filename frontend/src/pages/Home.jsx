import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getRooms } from '../actions/roomAction';
import RoomsTable from '../components/RoomsTable'
import Bookings from '../components/Bookings'

function Home() {
  

  return (
    <div className='home'>
      <Navbar/>
      <RoomsTable/>
      <Bookings/>
    </div>
  )
}

export default Home
