import Button from '@mui/material/Button'
import { SetStateAction, useState } from 'react'
import ErrorDisplay from './ErrorDisplay'
import {UserObj} from './App'
import {API_ROOT} from '../constants'
import {useNavigate} from 'react-router-dom'

type DeleteUserProps = {
    currentUser: UserObj
    setCurrentUser: SetStateAction<any>
}

function DeleteUser({currentUser, setCurrentUser }:DeleteUserProps) {

    const [error, setError] = useState<string|null>(null)
    const navigate = useNavigate()

    async function handleDeleteUser() {
        let resp = await fetch(`${API_ROOT}/users/${currentUser.id}`, {method: 'DELETE'})

        if(resp.ok) {
            resp.json().then(data => {
                navigate('/')
                setCurrentUser(null)
            })
        } else {
            resp.json().then(error => setError(error))
        }
    }

    return (
        <>
            {error ? <ErrorDisplay error={error}/> : null}
            <Button onClick={handleDeleteUser}>Delete Your Account</Button>
        </>
    )
}

export default DeleteUser