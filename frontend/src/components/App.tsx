import '../App.css';
import { useState} from 'react'
import LogInSignUp from './LogInSignUp';
import Home from './Home'
import NavBar from './NavBar'
import {Routes, Route} from 'react-router-dom'

export type UserObj = {
  id: number,
  name: string,
  email: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserObj | {}>({})
 
  console.log(currentUser)
  return (
    <> 
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LogInSignUp setCurrentUser={setCurrentUser}/>} />
      </Routes>
    </>
  )
}

export default App;