import { SyntheticEvent, useEffect, useState } from 'react'
import { UserObj } from './App'
import {API_ROOT} from '../constants'
import ErrorDisplay from './ErrorDisplay'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent} from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

type LogInProps = {
    handleLogin: (user: UserObj) => void
}

// This component presents a list of users to select from in order to log in

function LogIn({handleLogin}: LogInProps) {

    const [userList, setUserList] = useState<Array<UserObj> | [] >([])
    const [selected, setSelected] = useState<UserObj>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)

    // On initial component render, a fetch request to the backend is made which should return an array of user objects
    // including their id, name, and email. userList state is then set to this array.
    useEffect(() => {
        async function fetchUserList() {
            let resp = await fetch(`${API_ROOT}/users`)

            if(resp.ok) {
                resp.json().then(data => {
                    setUserList(data)
                    setLoading(false)
                })
            } else {
                resp.json().then(error => setError(error.detail))
            }
        }
        fetchUserList()
    }, [])

    // handleChange updates state to the user matching the id value of the selected option
    function handleChange(e: SelectChangeEvent) {
        let id = parseInt(e.target.value)
        let user = userList.find(user => user.id === id)
        setSelected(user)
    }

    // handleSubmit passes the selected user object and passes it up to the handleLogin function in the App component.
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        if(selected){
            handleLogin(selected)
        }
    }

    return(
        <div id='login-container'>
            {error ? <ErrorDisplay error={error}/> : null}
            <p>Select your username:</p>
            {loading ? <p>Loading...</p> : 
                <form id='login-form' onSubmit={handleSubmit}>
                    <FormControl size='medium' variant='filled'>
                        <InputLabel>User</InputLabel>
                        <Select label='User' onChange={handleChange}>
                            {userList.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                        </Select>
                        <Button id='login-button' type='submit' disabled={!selected}>Log In</Button>
                    </FormControl>
                </form>
            }
        </div>
    )
}

export default LogIn