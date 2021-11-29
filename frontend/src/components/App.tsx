import React from 'react';
import '../App.css';
import { useState} from 'react'
import SignUp from './SignUp'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  console.log('Current user')
  console.log(currentUser)
  return (
    <div>
      <SignUp setCurrentUser={setCurrentUser}/>
    </div>
  );
}

export default App;
