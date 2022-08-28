import './App.css';
import React, {useState} from 'react';
import { supabase } from './util/supaBaseClient';
import Task from './Task';

function App() {

  const [userData, setUserData] = useState({email: '', pass: ''});
  const [user, setUser] = useState({});

  function credentialsData(e:any) {
    e.preventDefault();
    if(e.target.name === 'email')
      setUserData({...userData, email:e.target.value})
    else
      setUserData({...userData, pass:e.target.value})
  }

  async function handleSignUp() {
    try{
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.pass,
      })
      if(data) {
        setUser(data);
      }
      if(error) console.error(error);
    }
    catch(e) {
      console.error("ERROR from signing up:",e);
    }
  }

  async function handleSignIn() {
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.pass,
      })
      if(data.session !== null) {
        console.log(data);
        setUser(data);
      }
      if(error) console.error(error);
    }
    catch(e) {
      console.error("ERROR from signing up:",e);
    }
  }

  async function handleSignOut() {
    try {
      let { error } = await supabase.auth.signOut();
      setUser({});
      if(error) console.error(error);
    }
    catch(e) {
      console.error("ERROR from logging out:",e);
    }
  }
  let userlength = Object.keys(user).length;
  return (
    <div className="App-header">
      { userlength ? <button onClick={() => handleSignOut()}>SignOut</button> : null}
      {!userlength ? <>
        <div style={{margin: '2rem'}}>
          Create or Login into account:
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor='email' style={{fontSize: 'medium', margin: '10px' }}>Email:</label>
          <input id='email' name='email' placeholder={"Enter your eamil"} value={userData.email} type="email" onChange={(e) => credentialsData(e)} />
          <label htmlFor='pass' style={{fontSize: 'medium', margin: '10px' }}>Password:</label>
          <input id='pass' name='pass' placeholder={"Enter your password"} value={userData.pass} type="password" onChange={(e) => credentialsData(e)} />
        </div>
        <div style={{display: 'flex', margin:"2rem"}}> 
          <button onClick={() => handleSignUp()} style={{margin: '1rem'}}>SignUp</button>
          <button onClick={() => handleSignIn()} style={{margin: '1rem'}}>SignIn</button>
        </div>
      </> :
      <Task userData={user}/>
    }
    </div>
  );
}

export default App;
