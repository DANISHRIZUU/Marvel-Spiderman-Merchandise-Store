import '../App.css'

export default function Login() {
    return(
        <>
        <form action="{% url 'login' %}" method='post'>
            <div className='login-container'>
                <div className='login-box'>
                    <h5>Login</h5>
                    <div className='form-group'>
                        <input autoFocus className='form-control' type='text' placeholder='Username' name='username'/>
                    </div>
                    <div className='form-group'>
                        <input autoFocus className='form-control' type='password' placeholder='Password' name='password'/>
                    </div>
                    <input className='btn btn-primary' type='submit' value="Login"/>
                </div>
            </div>
        </form>
        </>
    )
}