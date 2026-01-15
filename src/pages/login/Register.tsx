import { Link } from 'react-router-dom'
import Form from '../../components/common/Form'
import './Register.css'
import { useRef, useState, type FormEvent } from 'react'
import ErrorMessage from '../../components/common/ErrorMessage';

function Register() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const repPassRef = useRef<HTMLInputElement>(null);

    const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = emailRef.current?.value ?? "";
        const givenPass = passRef.current?.value ?? "";
        const givenRepPass = repPassRef.current?.value ?? "";

        // TODO: Email and password validation.

        console.log(givenPass, givenRepPass, givenPass === givenRepPass)
        if (givenPass !== givenRepPass) {
            setErrMsg("Passwords don't match. Please try again.");
            return;
        }
    }

    return (
        <div className='register-page' data-testid='Register'>
            <Form formTitle='Register' onSubmit={onSubmit}>
                <div className='form-field'>
                    <label htmlFor='email'>E-Mail Address:</label>
                    <input type='text' id='email' name='email' placeholder='e.g. name@email.com' autoComplete='email' ref={emailRef} required />
                </div>
                <div className='form-field'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder='*********' autoComplete='new-password' ref={passRef} required />
                </div>
                <div className='form-field'>
                    <label htmlFor='repeatpassword'>Repeat password:</label>
                    <input type='password' id='repeatpassword' name='repeatpassword' placeholder='*********' autoComplete='new-password' ref={repPassRef} required />
                </div>
                <ErrorMessage errMsg={errMsg} />
                <button className='form-submit' type='submit'>Create Account</button>
                <Link className='login-link' to='/login'>Already have an account?</Link>
            </Form>
        </div>  
    )
}

export default Register