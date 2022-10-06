import React, { useEffect } from 'react'
import FriendsArea from './FriendsArea'
import ChatArea from './ChatArea'


const RESPONSIVE_WIDTH = 600

export default function Home() {

  return (<div className='home'>
    <div className='container' >
      <FriendsArea/>
      <ChatArea/>
    </div>
  </div>)
}
