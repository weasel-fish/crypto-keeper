import '../App.css';
import { useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LogInSignUp from './LogInSignUp';
import Home from './Home'
import NavBar from './NavBar'
import CurrencyPage from './CurrencyPage'

export type UserObj = {
  id: number,
  name: string,
  email: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserObj | null>(null)

  const navigate = useNavigate()

  function handleLogin(user: UserObj):void {
      setCurrentUser(user)
      navigate('/')
  }

  return (
    <> 
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path='/' element={<Home currentUser={currentUser}/>}/>
        <Route path='/login' element={<LogInSignUp handleLogin={handleLogin}/>} />
        <Route path='/currency/:name(:id)' element={<CurrencyPage currentUser={currentUser}/>}/>
      </Routes>
      {/* <CurrencyList /> */}
    </>
  )
}

export default App;