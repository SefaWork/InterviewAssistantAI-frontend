import { Link } from 'react-router-dom';
import Form from '../../components/common/Form';
import { useRef, useState, type FormEvent } from 'react';
import ErrorLabel from '../../components/common/ErrorLabel';
import './Login.css'
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/common/ErrorMessage';

interface ErrorMessageState {
    emailErr?: string | undefined,
    passErr?: string | undefined
}

function Login() {
    const authContext = useAuth();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});
    const [submitErr, setSubmitErr] = useState<string | undefined>(undefined);

    const action = async (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = emailRef.current?.value ?? "";
        const givenPassword = passRef.current?.value ?? "";

        const newState: ErrorMessageState = {
            emailErr: givenEmail.length < 4? "Please enter a valid e-mail address." : undefined,
            passErr: givenPassword.length <= 3? "Please enter a valid password." : undefined
        }

        setErrors(newState)
        if(newState.emailErr || newState.passErr) return;

        setSubmitErr(undefined);
        try {
            await authContext.fetchTokens(givenEmail, givenPassword);
        } catch(err) {
            setSubmitErr(err instanceof Error ? err.message : 'An error occurred. Please try again.')
        }
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
                <ErrorMessage errMsg={submitErr} />
                <button className='form-submit' type='submit'>Login</button>
                <Link className='register-link' to='/register'>Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login;