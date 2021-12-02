import { SyntheticEvent, ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import {UserObj} from './App'

function LogIn({handleLogin}: any) {
    const [userList, setUserList] = useState<Array<UserObj> | [] >([])
    const [selected, setSelected] = useState<UserObj>()

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(setUserList)
    }, [])

    function handleChange(e: ChangeEvent<any>) {
        let id = parseInt(e.target.value)
        let user = userList.find(user => user.id === id)
        setSelected(user)
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        handleLogin(selected)
    }

    return(
        <>
            <h1>Select User</h1>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    {userList.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                <input type='submit' />
            </form>
        </>
    )
}

export default LogIn