import {NavLink, useNavigate} from 'react-router-dom'
import { SetStateAction } from 'react'
import {UserObj} from './App'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

type NavBarProps = {
    currentUser: UserObj | null
    setCurrentUser: SetStateAction<any>
    setCurrentUserWallets: SetStateAction<any>
}

function NavBar({currentUser, setCurrentUser, setCurrentUserWallets}: NavBarProps) {

    const navigate = useNavigate()

    function handleLogout() {
        navigate('/')
        setCurrentUser(null)
        setCurrentUserWallets(null)
    }

    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between'}}>
                <Button component={NavLink} color='inherit' to='/'>Crypto Keeper</Button>
                {!currentUser ? <Button component={NavLink} color='inherit' to='/login'>Log In / Sign Up</Button> : 
                                <Button color='inherit' onClick={() => handleLogout()}>Log Out</Button>}
            </Toolbar>
        </AppBar>
        // </Box>
    )
}

export default NavBar