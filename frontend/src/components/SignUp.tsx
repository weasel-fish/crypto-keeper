import { SyntheticEvent, ChangeEvent, SetStateAction, useState } from "react"
import { UserObj } from './App'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import ErrorDisplay from "./ErrorDisplay"

type SignUpProps = {
    handleLogin: (user: UserObj) => void
}

function SignUp({handleLogin}: SignUpProps) {

    const [formData, setFormData] = useState({name: '', email: ''})
    const [error, setError] = useState(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setError(null)

        let resp = await fetch('http://localhost:3000/users', { 
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