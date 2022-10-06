import React from 'react'

export default function Messages() {

    const message=(msg)=>msg.sender=='aryan@gmail.com' ? 
        <div className='mine-message'>
            <span className='text' >{msg.text}</span>
            <span className='time' >{msg.time}</span>
        </div> : 
         <div className='message'>
            <span className='text' >{msg.text}</span>
            <span className='time' >{msg.time}</span>
        </div>

  return (<div className='messages' >
    {message({text: 'hey', sender: 'sagar', time: '04:30 am'})} 
    {message({text: 'hey', sender: 'aryan@gmail.com', time: '04:30 am'})}
    {message({text: 'hey', sender: 'sagar', time: '04:30 am'})}
    {message({text: 'hey', sender: 'aryan@gmail.com', time: 'Just now'})}
  </div>)
}
