import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/common/Form'
import './Register.css'
import { useRef, useState, type FormEvent } from 'react'
import ErrorLabel from '../../components/common/ErrorLabel';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/common/ErrorMessage';

interface ErrorMessageState {
    email?: string | undefined,
    pass?: string | undefined,
    repPass?: string | undefined
}

function Register() {
    const authContext = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const repPassRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});
    const [submitErr, setSubmitErr] = useState<string | undefined>(undefined);
    const [processing, setProcessing] = useState<boolean>(false);
    
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = emailRef.current?.value ?? "";
        const givenPass = passRef.current?.value ?? "";
        const givenRepPass = repPassRef.current?.value ?? "";

        // TODO: Email and password validation.

        const newStates: ErrorMessageState = {
            email: givenEmail.length < 4? "Please input a valid e-mail address." : undefined,
            pass: givenPass.length < 8? "Please input a password that is at least 8 characters long." : undefined,
            repPass: givenPass != givenRepPass? "Passwords don't match." : undefined
        }

        setErrors(newStates);
        if (newStates.email || newStates.pass || newStates.repPass) return;

        setProcessing(true);
        try {
            await authContext.registerUser(givenEmail, givenPass);
            navigate('/login');
        } catch(err) {
            setSubmitErr(err instanceof Error? err.message : "An error occured. Please try again.");
        }
        setProcessing(false);
    }

    return (
        <div className='register-page' data-testid='Register'>
            <Form formTitle='Register' onSubmit={onSubmit}>
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' ref={emailRef} required />
                    <ErrorLabel errMsg={errors.email} />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='new-password' ref={passRef} required />
                    <ErrorLabel errMsg={errors.pass} />
                </div>
                <div className='form-field'>
                    <label htmlFor='repeatpassword'>Repeat password:</label>
                    <input type='password' id='repeatpassword' name='repeatpassword' placeholder='*********' autoComplete='new-password' ref={repPassRef} required />
                    <ErrorLabel errMsg={errors.repPass} />
                </div>
                <ErrorMessage errMsg={submitErr} />
                <button className='form-submit' type='submit' disabled={processing}>{processing? "Creating account..." : "Create Account"}</button>
                <Link className='login-link' to='/login'>Already have an account?</Link>
            </Form>
        </div>  
    )
}

export default Register