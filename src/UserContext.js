import { async } from "@firebase/util";
import { Children, createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext()
const RESPONSIVE_WIDTH = 600

export const useUserStore=()=>useContext(UserContext).User
export const useRoomStore=()=>useContext(UserContext).Room
export const useErrorStore=()=>useContext(UserContext).Error
export const usePageToggle=()=>useContext(UserContext).Toggle

export default function UserProvider({children}){

    const [user, setUserStore] = useState(null)
    const [room, setRoomStore] = useState(null)
    const [error, setErrorStore] = useState(null)
    const [pageToggle, setToggle] = useState({
        chatPage: window.screen.width < RESPONSIVE_WIDTH ? false: true, 
        friendsPage: true,
        isPhoneScreen: window.screen.width < RESPONSIVE_WIDTH ? true : false
    })


    const setPageToggle=(value)=>{
        setToggle({...value, isPhoneScreen: pageToggle.isPhoneScreen})
    }

    return(<UserContext.Provider value={{
            User: [user, setUserStore], 
            Room: [room, setRoomStore],
            Error: [error, setErrorStore],
            Toggle: [pageToggle, setPageToggle]
        }} >
        {children}
    </UserContext.Provider>)

}