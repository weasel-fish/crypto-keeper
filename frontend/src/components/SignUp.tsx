import { SyntheticEvent, ChangeEvent, useState } from "react"

function SignUp() {

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
        .then(console.log)
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" name="name" onChange={handleChange}></input></label>
                <label>Email: <input type="text" name="email" onChange={handleChange}></input></label>
                <input type='submit' value='Create Account'/>
            </form>
        </>
    )
}

export default SignUp