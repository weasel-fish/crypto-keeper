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

function LogIn({handleLogin}: LogInProps) {

    const [userList, setUserList] = useState<Array<UserObj> | [] >([])
    const [selected, setSelected] = useState<UserObj>()
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        async function fetchUserList() {
            let resp = await fetch(API_ROOT+'/users')

            if(resp.ok) {
                resp.json().then(setUserList)
            } else {
                resp.json().then(error => setError(error.detail))
            }
        }
        fetchUserList()
    }, [])

    function handleChange(e: SelectChangeEvent) {
        let id = parseInt(e.target.value)
        let user = userList.find(user => user.id === id)
        setSelected(user)
    }

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
                <form id='login-form' onSubmit={handleSubmit}>
                    <FormControl size='medium' variant='filled'>
                        <InputLabel>User</InputLabel>
                        <Select label='User' onChange={handleChange}>
                            {userList.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                        </Select>
                        <Button id='login-button' type='submit' disabled={!selected}>Log In</Button>
                    </FormControl>
                </form>
        </div>
    )
}

export default LogIn