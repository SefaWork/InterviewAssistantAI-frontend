import { Link } from 'react-router-dom';
import Form from '../../components/common/Form';
import { useRef, useState, type FormEvent } from 'react';
import ErrorLabel from '../../components/common/ErrorLabel';
import './Login.css'

interface ErrorMessageState {
    emailErr?: string | undefined,
    passErr?: string | undefined
}

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});

    const action = async (e: FormEvent) => {
        e.preventDefault();

        let givenEmail = emailRef.current?.value ?? "";
        let givenPassword = passRef.current?.value ?? "";

        const newState: ErrorMessageState = {
            emailErr: givenEmail.length < 4? "Please enter a valid e-mail address." : undefined,
            passErr: givenPassword.length <= 3? "Please enter a valid password." : undefined
        }

        setErrors(newState)
        if(newState.emailErr || newState.passErr) return;
    }

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle='Login' onSubmit={action}>            
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' ref={emailRef} required />
                    <ErrorLabel errMsg={errors.emailErr} />
                </div>
                <div className='form-field'>
                    <label htmlFor='email'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='current-password' ref={passRef} required />
                    <ErrorLabel errMsg={errors.passErr} />
                </div>
                <button className='form-submit' type='submit'>Login</button>
                <Link className='register-link' to='/register'>Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login;