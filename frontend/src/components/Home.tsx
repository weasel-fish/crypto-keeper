import CurrencyList from "./CurrencyList"
import { UserObj } from './App'

type HomeProps = {
    currentUser: UserObj | null
}

function Home({currentUser}:HomeProps) {
    return (
        <div className="homePage">
            <h1>{currentUser ? `Welcome ${currentUser?.name}`:'Welcome!'}</h1>
            <CurrencyList />
        </div>
    )
}

export default Home