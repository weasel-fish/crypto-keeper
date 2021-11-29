import React from 'react';
import '../App.css';
import { useState} from 'react'
import SignUp from './SignUp'

function App() {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div>
      <SignUp />
    </div>
  );
}

export default App;
