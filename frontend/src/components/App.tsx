import '../App.css';
import { useState} from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'

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
      {currentUser ? <LogIn setCurrentUser={setCurrentUser}/>: <SignUp setCurrentUser={setCurrentUser}/>}
    </>
  )
}

export default App;