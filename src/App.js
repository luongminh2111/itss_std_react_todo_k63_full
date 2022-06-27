import React, { useEffect, useState }  from 'react'


import './styles/main.css';
import Todo from './components/Todo';
import Login from "./components/Login";

import { auth, storeUserInfo} from "./lib/firebase";

function App() {
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let newUser = null;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };
  

  const HeaderContent = () => {
    if (user) {
      return (
        <div class="navbar-end">
          <div class="navbar-item">
            <img src={user.image} />
            {user.name}
          </div>
          <div class="navbar-item">
            <button class="button is-danger is-light is-small" onClick={logout} > Logout</button>
          </div>
        </div >
      )
    } else {
      return (<Login />)
    }
  }
  
  return (
    <div className="container is-fluid">
      <header class="navbar">
          <HeaderContent />
      </header >
      <div>
        {user && <Todo />}
      </div>
    </div >
  );
}

export default App;
