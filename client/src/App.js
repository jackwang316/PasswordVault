import './App.css';
import {useState} from "react";

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')
  return (
    <div className="App">
      <div className="AddPassword">
          <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                  setUsername(event.target.value)
              }}
          />
          <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                  setPassword(event.target.value)
              }}
          />
          <input
              type="text"
              placeholder="Website"
              onChange={(event) => {
                  setWebsite(event.target.value)
              }}
          />
          <button>Add Password</button>
      </div>
    </div>
  );
}

export default App;
