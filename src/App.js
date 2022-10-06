import './App.scss';
import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './components/Auth';
import Home from './components/Home';
import {useUserStore, useErrorStore} from './UserContext'

const ERROR_STAY_TIME = 2000

function App() {

  const [user] = useUserStore()
  const [error, setErrorStore] = useErrorStore()

  useEffect(()=>{



    if(error){
      setTimeout(()=>{
        console.log('do null')
        setErrorStore(null)
      },ERROR_STAY_TIME)
    }


  }, [error])


  return (<Router>
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
