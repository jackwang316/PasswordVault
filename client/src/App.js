import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [website, setWebsite] = useState('')

    const addPassword = () => {
        Axios.post('http://localhost:3001/addpassword', {
            username: username,
            password: password,
            website:  website,
        }).then((res) =>{
            console.log()
        });
    }
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
            <button onClick={addPassword}> Add Password</button>
        </div>
        </div>
    );
}

export default App;
