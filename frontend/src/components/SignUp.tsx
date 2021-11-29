import { SyntheticEvent, ChangeEvent, SetStateAction, useState } from "react"

function SignUp({setCurrentUser}: SetStateAction<any>) { //need to figure out what to replace 'any' with

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
        .then((newUser) => setCurrentUser(newUser))
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" name="name" onChange={handleChange} value={formData.name}></input></label>
                <label>Email: <input type="text" name="email" onChange={handleChange} value={formData.email}></input></label>
                <input type='submit' value='Create Account'/>
            </form>
        </>
    )
}

export default SignUp