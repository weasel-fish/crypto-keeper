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

// This is the top level component. It always renders a NavBar fixed to the top of the page.
// It conditionally renders the Home, LogInSignUp, and CurrencyPage components, depending on the route parameters.

function App() {
  const [currentUser, setCurrentUser] = useState<UserObj | null>(null)

  const navigate = useNavigate()

  // handleLogin sets the user to the user selected or created in the LogInSignUp component and navigates to the Home component.
  function handleLogin(user: UserObj):void {
      setCurrentUser(user)
      navigate('/')
  }

  return (
    <> 
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path='/' element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        <Route path='/login' element={<LogInSignUp handleLogin={handleLogin}/>} />
        <Route path='/currency/:name(:id)' element={<CurrencyPage currentUser={currentUser}/>}/>
      </Routes>
    </>
  )
}

export default App;