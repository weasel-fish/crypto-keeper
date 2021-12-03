import CurrencyList from "./CurrencyList"
import { UserObj } from './App'

type HomeProps = {
    currentUser: UserObj | null
}

function Home({currentUser}:HomeProps) {
    return (
        <div className="homePage">
            <h2>{currentUser ? `Welcome ${currentUser?.name}`:'Welcome!'}</h2>
            <CurrencyList />
        </div>
    )
}

export default Home