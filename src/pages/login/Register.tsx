import { Link } from 'react-router-dom'
import Form from '../../components/common/Form'
import './Register.css'

function Register() {
    return (
        <div className='register-page'>
            <Form formTitle='Register'>
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' required />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='off' required />
                </div>
                <div className='form-field'>
                    <label htmlFor='repeatpassword'>Repeat password:</label>
                    <input type='password' id='repeatpassword' name='repeatpassword' placeholder='*********' autoComplete='off' required />
                </div>
                <button className='form-submit' type='submit'>Create Account</button>
                <Link className='login-link' to='/login'>Already have an account?</Link>
            </Form>
        </div>  
    )
}

export default Register