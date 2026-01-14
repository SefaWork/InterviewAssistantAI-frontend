import Form from '../../components/common/Form'
import './Register.css'

function Register() {
    return (
        <div className='register-page'>
            <Form formTitle='Register'>
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' autoComplete='email' required />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' autoComplete='off' required />
                </div>
                <div className='form-field'>
                    <label htmlFor='repeatpassword'>Repeat password:</label>
                    <input type='password' id='repeatpassword' name='repeatpassword' autoComplete='off' required />
                </div>
                <button className='form-submit' type='submit'>Create Account</button>
            </Form>
        </div>  
    )
}

export default Register