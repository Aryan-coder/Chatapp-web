import { async } from '@firebase/util';
import userEvent from '@testing-library/user-event';
import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, {useEffect, useRef, useState } from 'react'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import {IoExitOutline} from "react-icons/io5";
import { COLLECTIONS, db } from '../Firebase';
import { useUserStore, useRoomStore, usePageToggle} from '../UserContext';


export default function Chat() {

  const [room] = useRoomStore()
  const [user] = useUserStore()
  const [chats, setChats] = useState(null)
  const [pageToggle, setPageToggle] = usePageToggle()

  const bottomRef = useRef()
  const inputRef = useRef()

  useEffect(()=>{
    if(room!=null){
      const unSub = onSnapshot(doc(db, COLLECTIONS.CHATS, room.name),(res)=>{
        if(!res.exists()){
          createChatRoom()
        }
        setChats(res.data().messages)
        pageToggle.isPhoneScreen && setPageToggle({friendsPage: false, chatPage: true})
      })

      return(()=>unSub())
    }

  },[room])

  useEffect(()=>{

    if(chats!=null){
      bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }
  },[chats])


  const createChatRoom=()=>{
    try{
      setDoc(doc(db, COLLECTIONS.CHATS, room.name),{
        messages: []
      })
    }catch(err){
      console.log(err)
    }
  }

  const sendChat=()=>{
    const input = inputRef.current
    if(input.value == '')return(null);
    try{
      updateDoc(doc(db, COLLECTIONS.CHATS, room.name),{
        messages: arrayUnion({sender: user.email, text: input.value, time: Timestamp.now()})
      })
    }catch(err){
      alert("Couldn't send message")
      console.log(err)
    }
    input.value = ''
  }

 
  const getTime=(time)=>{
    const fullTime = new Date(time.seconds*1000).toString().split(' ')[4]
    return(fullTime.split(':')[0]+':'+fullTime.split(':')[1])
  }

  const message=(msg,key)=>msg.sender==user.email ? 
        <div className='mine-message' key={key}>
            <span className='text' >{msg.text}</span>
            <span className='time' >{getTime(msg.time)}</span>
        </div> : 
         <div className='message' key={key}>
            <span className='text' >{msg.text}</span>
            <span className='time' >{getTime(msg.time)}</span>
        </div>

  

  return (<div className={pageToggle.chatPage ? 'chat' : 'none'} >
  {room==null ? <>
    <nav>
            <div className='blank' >
                
            </div>
        </nav>
  </> : <>
    <nav>
            <div className='profile' >
                <img src={room.friend.photo} />
                <div className='column' >
                <span className='name' >{room.friend.name}</span>
                <span className='email' >{room.friend.email}</span>
                </div>
            </div>
            {pageToggle.isPhoneScreen && <button className='back' onClick={()=>setPageToggle({chatPage: false, friendsPage: true})} ><IoExitOutline/></button>}
        </nav>
        <div className='messages' >
    {(chats==null || chats.length<1) || chats.map((chat,i)=>message(chat,i))}
    <div ref={bottomRef} />
  </div>
  
        <div className='send-input' >
          <input type='text'ref={inputRef} placeholder='Type message here' onKeyDown={e=>e.key=='Enter' && sendChat()} />
          <button onClick={()=>sendChat()} ><BsArrowRight/></button>
        </div>
        </>
  }
  </div>)
}
