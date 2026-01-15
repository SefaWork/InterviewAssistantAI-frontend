import { Link } from 'react-router-dom';
import Form from '../../components/common/Form';
import { useRef, useState, type FormEvent } from 'react';
import ErrorMessage from '../../components/common/ErrorMessage';
import './Login.css'

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errMsg, setErrMsg] = useState<string | undefined>(undefined)

    const action = async (e: FormEvent) => {
        e.preventDefault();

        let givenEmail = emailRef.current?.value ?? "";
        let givenPassword = passRef.current?.value ?? "";

        if (givenEmail?.length < 4) {
            setErrMsg("Please enter a valid e-mail address.")
            return
        }

        if (givenPassword?.length <= 3) {
            setErrMsg("Please enter a valid password.")
            return
        }

        setErrMsg(undefined)
    }

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle='Login' onSubmit={action}>            
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' ref={emailRef} required />
                </div>
                <div className='form-field'>
                    <label htmlFor='email'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='current-password' ref={passRef} required />
                </div>
                <ErrorMessage errMsg={errMsg} />
                <button className='form-submit' type='submit'>Login</button>
                <Link className='register-link' to='/register'>Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login;