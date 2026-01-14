// wip
import Form from '../../components/common/Form';
import './Login.css'

function Login() {
    return (
        <div className='login-page'>
            <Form formTitle='Login'>            
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' required />
                </div>
                <div className='form-field'>
                    <label htmlFor='email'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='password' required />
                </div>
                <button className='form-submit' type='submit'>Login</button>
            </Form>
        </div>
    )
}

export default Login;