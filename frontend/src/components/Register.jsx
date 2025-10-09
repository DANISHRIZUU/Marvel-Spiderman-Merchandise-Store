import '../App.css'
import { useState } from 'react'
export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmpassword) {
            setMessage("Passwords do not match")
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                setMessage("✅ User account created!");
            } else {
                setMessage("❌ Error creating account!");
            }
        } catch (error) {
            setMessage("❌ Something went wrong!");
        }
    }

    return(
        <>
        <form  onSubmit={handleSubmit} >
            <div className='register-container'>
                <div className='register-box'>
                    <h5>Register</h5>
                    <div className='form-group'>
                        <input type='text' name='username' autoFocus className='form-control' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' autoFocus name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' autoFocus name='confirmpassword' placeholder='Confirm Your Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <input type='submit' className='btn btn-primary'/>
                    {message && <h6>{message}</h6>}
                </div>
            </div>
        </form>
        </>
    )

}