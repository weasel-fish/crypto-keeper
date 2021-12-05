import { NavLink, useNavigate } from 'react-router-dom'
import { SetStateAction } from 'react'
import { UserObj } from './App'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

type NavBarProps = {
    currentUser: UserObj | null
    setCurrentUser: SetStateAction<any>
}

// This component renders a navigation bar at the top of the page. It includes a Crypto Keeper link that navigates to 
// the home page, and either a Log In / Sign Up button or a Log Out button that navigates to the LogInSignUp page or logs
// a user out, respectively
function NavBar({currentUser, setCurrentUser}: NavBarProps) {

    const navigate = useNavigate()

    function handleLogout():void {
        navigate('/')
        setCurrentUser(null)
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between'}}>
                <Button component={NavLink} color='inherit' to='/'>Crypto Keeper</Button>
                {!currentUser ? <Button component={NavLink} color='inherit' to='/login'>Log In / Sign Up</Button> : 
                                <Button color='inherit' onClick={() => handleLogout()}>Log Out</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar