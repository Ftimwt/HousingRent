import './App.css'
import {useAuth} from "./context/auth.tsx";
import {useEffect} from "react";

function App() {
  const {user, login, logout} = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  function handleLogin() {
    console.log('login')
    login("abolfazlalz", "123456").then(console.log);
  }

  function handleLogout() {
    logout();
  }

  return (
      <div>
        <button onClick={handleLogin}>login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
  )
}

export default App
