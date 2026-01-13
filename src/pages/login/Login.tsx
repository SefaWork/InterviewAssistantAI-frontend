// wip
import './Login.css'

function Login() {
    return (
        <div className='login-page'>
            <div className='login-form-container'>
                <h1>Login</h1>
                <form className='login-form'>
                    <div className='form-input'>
                        <label htmlFor='email'>E-Mail Address:</label>
                        <input type='text' id='email' name='email' autoComplete='email'></input>
                    </div>
                    <div className='form-input'>
                        <label htmlFor='email'>Password:</label>
                        <input type='password' id='password' name='password' autoComplete='password'></input>
                    </div>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
    )
}

export default Login;