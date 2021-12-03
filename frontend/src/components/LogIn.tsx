import { SyntheticEvent, ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import {UserObj} from './App'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent} from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

function LogIn({handleLogin}: any) {
    const [userList, setUserList] = useState<Array<UserObj> | [] >([])
    const [selected, setSelected] = useState<UserObj>()

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(setUserList)
    }, [])

    function handleChange(e: SelectChangeEvent) {
        let id = parseInt(e.target.value)
        let user = userList.find(user => user.id === id)
        setSelected(user)
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        handleLogin(selected)
    }

    return(
        <div id='login-container'>
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