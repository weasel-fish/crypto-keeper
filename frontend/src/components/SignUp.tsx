import { SyntheticEvent, ChangeEvent, SetStateAction, useState } from "react"
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

function SignUp({handleLogin}: any) { //need to figure out what to replace 'any' with

    const [formData, setFormData] = useState({name: '', email: ''})

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        fetch('http://localhost:3000/users', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: formData.name,
                email: formData.email
            })
        })
        .then(resp => resp.json())
        .then((newUser) => handleLogin(newUser))
    }
    
    return(
        <>
        {/* <Input placeholder="Search" value={searchText} onChange={handleSearch}/> */}
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name" type="text" name="name" onChange={handleChange} value={formData.name}></Input>
                <Input placeholder="Email" type="text" name="email" onChange={handleChange} value={formData.email}></Input>
                <Button type='submit'>Create Account</Button>
            </form>
        </>
    )
}

export default SignUp