import {NavLink, useNavigate} from 'react-router-dom'
import { SetStateAction } from 'react'
import {UserObj} from './App'

type NavBarProps = {
    currentUser: UserObj | null
    setCurrentUser: SetStateAction<any>
}

function NavBar({currentUser, setCurrentUser}: NavBarProps) {

    const navigate = useNavigate()

    function handleLogout() {
        navigate('/')
        setCurrentUser(null)
    }

    return (
        <>
            <NavLink to='/'>Crypto Keeper</NavLink>
            {!currentUser ? <NavLink to='/login'>Log In</NavLink> : `Welcome, ${currentUser.name}!`}
            {currentUser ? <button onClick={() => handleLogout()}>Log Out</button>: null}
        </>
    )
}

export default NavBar