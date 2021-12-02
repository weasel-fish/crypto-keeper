import { SetStateAction, useState } from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

function LogInSignUp({handleLogin}: any) {

    const [newUser, setNewUser] = useState(false)

    return (
        <>
            {newUser ? <SignUp handleLogin={handleLogin}/> : <LogIn handleLogin={handleLogin}/>}
            <p>{newUser ? 'Already a user?' : "Don't have an account?"}</p>
            <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Log In' : 'Sign Up'}</button>
        </>
    )
}

export default LogInSignUp