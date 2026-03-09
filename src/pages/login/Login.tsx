import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import { useRef, useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';
import './Login.css'

interface ErrorMessageState {
    emailErr?: string | undefined,
    passErr?: string | undefined
}

function Login() {
    const authContext = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});
    const [submitErr, setSubmitErr] = useState<string | undefined>(undefined);
    const [processing, setProcessing] = useState<boolean>(false);

    const action = async (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = (emailRef.current?.value ?? "").trim();
        const givenPassword = (passRef.current?.value ?? "").trim();
        
        const newState: ErrorMessageState = {};
        
        if(givenEmail.length === 0) {
            newState.emailErr = "Please fill this field."
        } else if(givenEmail.length < 3) {
            newState.emailErr = "Email address is too short."
        } else if(givenEmail.length > 254) {
            newState.emailErr = "Email address is too long."
        } else if(!givenEmail.includes('@')) {
            newState.emailErr = "A valid email address requires @ symbol."
        } else if(givenPassword.length === 0) {
            newState.passErr = "Please fill this field."
        } else if(givenPassword.length < 8) {
            newState.passErr = "Password is too short."
        } else if(givenPassword.length > 32) {
            newState.passErr = "Password is too long."
        }
        
        setErrors(newState)
        if(newState.emailErr || newState.passErr) return;
        
        setProcessing(true);
        try {
            await authContext.fetchTokens(givenEmail, givenPassword);
            navigate('/');
        } catch(err) {
            setSubmitErr(err instanceof Error ? err.message : 'An error occurred. Please try again.')
        }
        setProcessing(false);
    }

    const onInput = () => {
        setErrors({})
        setSubmitErr(undefined)
    }

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle='Login' onSubmit={action} onInput={onInput}>        
                <FormEmailField id='email' label='Email Address:' error={errors['emailErr']} ref={emailRef} />
                <FormPasswordField id='password' label='Password:' error={errors['passErr']} ref={passRef} />
                <FormSubmit disabled={processing} text={processing? "Logging in..." : "Login"} error={submitErr} />
                <Link to='/register'>Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login;