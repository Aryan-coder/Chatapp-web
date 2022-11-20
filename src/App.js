import './App.scss';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './components/Auth';
import Home from './components/Home';
import {useUserStore, useErrorStore, usePageToggle} from './UserContext'
import {MdCancel} from 'react-icons/md'

const ERROR_STAY_TIME = 2000

function App() {

  const [user] = useUserStore()
  const [error, setErrorStore] = useErrorStore()
  const [card, setCard] = useState(true)

  useEffect(()=>{



    if(error){
      setTimeout(()=>{
        setErrorStore(null)
      },ERROR_STAY_TIME)
    }


  }, [error])


  return (<Router>
  { (user==null || window.screen.width<1080 || !card)  || 
   <div className='admin' >
   <button onClick={()=>setCard(false)} ><MdCancel/></button>
   <p >type/copy my email address <span>aryan.behal.20@gmail.com </span> in <span>find friend </span>to chat with me :)
   </p>
   </div>
  }
  
    <div className={error && 'error-bar'}>
    <span>{error}</span>
  </div>
    <Routes>
      <Route path={user==null ? '/' : '/auth'} element={<Auth/>} />
      <Route path={user==null ? '/home' : '/'} element={<Home/>} />
    </Routes>
  </Router>);
}

export default App;
