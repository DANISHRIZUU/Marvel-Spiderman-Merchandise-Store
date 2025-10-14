import { useState } from 'react';
import '../App.css'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
    
    try{
       const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
       });
       const data = await res.json()

       if (res.ok) {
        // Save tokens
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setMessage("Login Successfull, Token Saved");
       } else {
        setMessage("Invalid Username or Password")
       } 
    }catch(error) {
        setMessage("Network Error")
       }
    };

    return(
        <>
        <form onSubmit={handleLogin} method='post'>
            <div className='login-container'>
                <div className='login-box'>
                    <h5>Login</h5>
                    <div className='form-group'>
                        <input autoFocus className='form-control' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} name='username'/>
                    </div>
                    <div className='form-group'>
                        <input autoFocus className='form-control' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} name='password'/>
                    </div>
                    <input className='btn btn-primary' type='submit' value="Login"/>
                </div>
            </div>
        </form>
        </>
    )
}