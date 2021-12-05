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

// This component renders a button that allows a user to delete their account
function DeleteUser({currentUser, setCurrentUser }:DeleteUserProps) {

    const [error, setError] = useState<string|null>(null)
    const navigate = useNavigate()

    // handleDeleteUser sends a delete request to the backend which should delete the user and any associated wallets
    // from the database. On success, it will navigate to the home page and set the current user to none
    async function handleDeleteUser() {
        let resp = await fetch(`${API_ROOT}/users/${currentUser.id}`, {method: 'DELETE'})

        if(resp.ok) {
            navigate('/')
            setCurrentUser(null)
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