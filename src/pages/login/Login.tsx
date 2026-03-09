import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import { useRef, useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/common/ErrorMessage';
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

        const givenEmail = emailRef.current?.value ?? "";
        const givenPassword = passRef.current?.value ?? "";
        
        const newState: ErrorMessageState = {
            emailErr: givenEmail.length < 4? "Please enter a valid e-mail address." : undefined,
            passErr: givenPassword.length <= 3? "Please enter a valid password." : undefined
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

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle='Login' onSubmit={action}>        
                <FormEmailField id='email' label='Email Address:' error={errors['emailErr']} ref={emailRef} />
                <FormPasswordField id='password' label='Password:' error={errors['passErr']} ref={passRef} />
                <ErrorMessage errMsg={submitErr} />
                <FormSubmit disabled={processing} text={processing? "Logging in..." : "Login"} />
                <Link to='/register'>Don't have an account?</Link>
            </Form>
        </div>
    )
}

export default Login;