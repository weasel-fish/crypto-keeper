import { SyntheticEvent, ChangeEvent, SetStateAction, useState } from "react"
import { UserObj } from './App'
import { API_ROOT } from '../constants'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import ErrorDisplay from "./ErrorDisplay"

type SignUpProps = {
    handleLogin: (user: UserObj) => void
}

// This component presents a form for a user to create a new profile with their name and email
function SignUp({handleLogin}: SignUpProps) {

    const [formData, setFormData] = useState({name: '', email: ''})
    const [error, setError] = useState<string|null>(null)

    // handleChange updates the state for the controlled form name and email inputs
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // handleSubmit sends a POST request to the backend to create a new user. If successful, the new user object will be returned
    // in the response and passed to the handleLogin function in the App component. If unsuccessful, an error will be displayed.
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setError(null)

        let resp = await fetch(`${API_ROOT}/users`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: formData.name,
                email: formData.email
            })
        })

        if(resp.ok) {
            resp.json().then((newUser: UserObj) => {
                handleLogin(newUser)
            })
        } else {
            resp.json().then(error => {
                console.log(error)
                setError(error.detail)
                setFormData({name: '', email: ''})
            })
        }
    }
    
    return(
        <>
            {error ? <ErrorDisplay error={error}/> : null}
            <form id='signup-form' onSubmit={handleSubmit}>
                <Input placeholder="Name" type="text" name="name" onChange={handleChange} value={formData.name}></Input>
                <Input placeholder="Email" type="text" name="email" onChange={handleChange} value={formData.email}></Input>
                <Button type='submit'>Create Account</Button>
            </form>
        </>
    )
}

export default SignUp