import CurrencyList from "./CurrencyList"
import { SetStateAction} from 'react'
import { UserObj } from './App'
import DeleteUser from './DeleteUser'

type HomeProps = {
    currentUser: UserObj | null
    setCurrentUser: SetStateAction<any>
}

function Home({currentUser, setCurrentUser}:HomeProps) {
    return (
        <div className="homePage">
            <h2>{currentUser ? `Welcome ${currentUser?.name}`:'Welcome!'}</h2>
            <CurrencyList />
            {currentUser ? <DeleteUser currentUser={currentUser} setCurrentUser={setCurrentUser}/> : null}
        </div>
    )
}

export default Home