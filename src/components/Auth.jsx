import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { BsUpload } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { COLLECTIONS, db } from '../Firebase';
import { useUserStore, useErrorStore } from '../UserContext';


export default function Auth() {

    const [user, setUserStore] = useUserStore()
    const [error, setErrorStore] = useErrorStore()

    const signIn=async()=>{
      try{
        const res = await signInWithPopup(getAuth(), new GoogleAuthProvider())
        let user = {name: res.user.displayName, email: res.user.email, photo: res.user.photoURL}
        const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.email))
        if(!userDoc.exists()){
          setDoc(doc(db, COLLECTIONS.USERS, user.email),{
            userDetails: user,
            friends: [],
          })
        }
        setUserStore(user)
      }catch(err){
        setErrorStore("Failed to Sign-up")
        console.log(err)
      }
    }

  
    return (<div className='Auth' >
    <form onSubmit={e=>e.preventDefault()} >
    <p>Click below to <span className='green'>Sign-Up</span> with <span className='blue'>Google</span>  </p>
      <button className='google-auth' onClick={e=>signIn()}>Proceed with <BsGoogle/></button>
    </form>
  </div>)
}
