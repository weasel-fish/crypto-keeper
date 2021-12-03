import '../App.css';
import { useState} from 'react'
import LogInSignUp from './LogInSignUp';
import Home from './Home'
import NavBar from './NavBar'
import {Routes, Route, useNavigate} from 'react-router-dom'
import CurrencyPage from './CurrencyPage'
import {API_ROOT} from '../constants'

export type UserObj = {
  id: number,
  name: string,
  email: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserObj | null>(null)
  const [currentUserWallets, setCurrentUserWallets] = useState<any |null>(null)

  const navigate = useNavigate()

  // async function fetchUserWallets(id: number) {
  //   let resp = await fetch(`${API_ROOT}/user_wallets/${id}`)

  //   if(resp.ok) {
  //     resp.json().then(data => {
  //       setCurrentUserWallets(data)
  //     })
  //   } else {
  //     resp.json().then(data => {
  //       console.log('Uh oh!')
  //     })
  //   }
  // }

  function handleLogin(user: UserObj):void {
      setCurrentUser(user)
      // fetchUserWallets(user.id)
      navigate('/')
  }

  return (
    <> 
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} setCurrentUserWallets={setCurrentUserWallets}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LogInSignUp handleLogin={handleLogin}/>} />
        <Route path='/currency/:name(:id)' element={<CurrencyPage currentUser={currentUser} wallets={currentUserWallets}/>}/>
      </Routes>
      {/* <CurrencyList /> */}
    </>
  )
}

export default App;