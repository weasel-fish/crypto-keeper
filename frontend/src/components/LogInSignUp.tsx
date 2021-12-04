import { useState } from 'react'
import { UserObj } from './App'
import Button from '@mui/material/Button'
import LogIn from './LogIn'
import SignUp from './SignUp'

type LogInSignUpProps = {
    handleLogin: (user: UserObj) => void
}

function LogInSignUp({handleLogin}: LogInSignUpProps) {

    const [newUser, setNewUser] = useState(false)

    return (
        <div id="login-signup">
            {newUser ? <SignUp handleLogin={handleLogin}/> : <LogIn handleLogin={handleLogin}/>}
            <p>{newUser ? 'Already a user?' : "Don't have an account?"}</p>
            <Button onClick={() => setNewUser(!newUser)}>{newUser ? 'Log In' : 'Sign Up'}</Button>
        </div>
    )
}

export default LogInSignUp