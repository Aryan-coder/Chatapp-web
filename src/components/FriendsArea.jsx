import userEvent from '@testing-library/user-event';
import React, {useEffect, useState} from 'react'
import { BsX, BsThreeDotsVertical, BsSearch, BsPersonXFill } from "react-icons/bs";
import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '../Firebase';
import { useUserStore, useRoomStore, useErrorStore, usePageToggle } from '../UserContext';
import { getAuth, signOut} from 'firebase/auth';


export default function FriendsArea() { 

  const [user, setUserStore] = useUserStore()
  const [room, setRoomStore] = useRoomStore()
  const [friends, setFriends] = useState(null)
  const [error, setError] = useErrorStore()
  const [pageToggle] = usePageToggle()

  useEffect(()=>{
      const unSub = onSnapshot(doc(db, COLLECTIONS.USERS, user.email),(res)=>{
        setFriends(res.data().friends)
      })

      return(()=>unSub())
    
  },[user])


  const addFriend=async(e)=>{
    const input = e.target
    const friendMail = input.value
    if(friendMail=='')return null;
   
    try{
      const res = await getDoc(doc(db, COLLECTIONS.USERS, friendMail))
      const friend = res.data().userDetails
      if(!res.exists()){
        alert("user doesn't exists")
        return(null)
      }
      updateDoc(doc(db, COLLECTIONS.USERS, friendMail),{
        friends: arrayUnion({...user, room: user.email<friend.email ? user.email+'-'+friend.email : friend.email+'-'+user.email})
      })
      updateDoc(doc(db, COLLECTIONS.USERS, user.email),{
        friends: arrayUnion({
          ...friend,
          room: user.email<friend.email ? user.email+'-'+friend.email : friend.email+'-'+user.email
        })
      })
      input.value = ''
    }catch(err){
      setError("Couldn't add User")
      console.log(err)
    }

  }

  const handleRoom=(friend)=>{
    setRoomStore({name: friend.room, friend})
  }


  const friendProfile=(friend)=> <div key={friend.email} onClick={(e)=>handleRoom(friend)} className={friend.room==(room==null ? '' : room.name) ? 'friend-focused' : 'friend'}>
        <img src={friend.photo} />
        <div className='column' >
          <span className='name' >{friend.name}</span>
          <span className='email' >{friend.email}</span>
        </div>
        <button className='block' onClick={()=>removeFriend(friend)} ><BsX/></button>
      </div>

  const signOutUser=async()=>{
    try{
      const res = await signOut(getAuth())
      setUserStore(null)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  const removeFriend=async(friend)=>{
   try{
    const res = await updateDoc(doc(db, COLLECTIONS.USERS, user.email),{
      friends: arrayRemove(friend)
    })
    console.log(res)
   }catch(err){
    console.log(err)
   }
  }

  return (
    <div className={pageToggle.friendsPage ? 'sidebar' : 'none'} >
        <nav>
            <div className='user' >
                <img src={user.photo} />
                <div className='column' >
                <span className='name' >{user.name}</span>
                <span className='email' >{user.email}</span>
                </div>
                <button className='logout' onClick={()=>signOutUser() }  ><BsPersonXFill/></button>
            </div>
        </nav>
        <div className='search' >
          <i><BsSearch/></i>
          <input className='search-input' type='text' onKeyDown={e=>e.code=='Enter' && addFriend(e)} placeholder='Find friend' />
      </div>
        <div className='friends-list'>
          {(friends==null || friends.length<1) ? '': friends.map(friend=>friendProfile(friend))}
        </div>
    </div>
  )

}
