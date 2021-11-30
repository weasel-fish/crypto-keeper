import '../App.css';
import { useState} from 'react'
import LogInSignUp from './LogInSignUp';
import Home from './Home'
import NavBar from './NavBar'
import {Routes, Route} from 'react-router-dom'
import CurrencyPage from './CurrencyPage'

export type UserObj = {
  id: number,
  name: string,
  email: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserObj | null>(null)

  return (
    <> 
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LogInSignUp setCurrentUser={setCurrentUser}/>} />
        <Route path='/currency/:name(:id)' element={<CurrencyPage />}/>
      </Routes>
      {/* <CurrencyList /> */}
    </>
  )
}

export default App;