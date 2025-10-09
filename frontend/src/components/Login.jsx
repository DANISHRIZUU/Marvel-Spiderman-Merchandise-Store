import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { useState } from "react"
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: 'POST',
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({username, password}),
            credentials: 'include'
        });
        const data = await response.json();
            if(data.success) {
                useNavigate("/home");
            } else {
                alert(data.message);
            }
        };
        
        
    }

    return(
        <>
        <form  onSubmit={handleSubmit} >
            <div className='login-container'>
                <div className='login-box'>
                    <h5>Login</h5>
                    <div className='form-group'>
                        <input type='text' onChange={(e) => setUsername(e.target.value)} autoFocus className='form-control' value={username} placeholder='Username' name='username'/>
                    </div>
                    <div className='form-group'>
                        <input autoFocus className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' name='password'/>
                    </div>
                    <input className='btn btn-primary' type='submit' value="Login"/>
                    <Link to={"/"}>
                    <button className='btn btn-primary' type='submit' value="Home"/>
                    </Link>
                </div>
            </div>
        </form>
        </>
    )
}