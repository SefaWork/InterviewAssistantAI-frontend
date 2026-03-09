import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import './Register.css'
import { useRef, useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth';
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';

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

        const givenEmail = (emailRef.current?.value ?? "").trim();
        const givenPass = (passRef.current?.value ?? "").trim();
        const givenRepPass = (repPassRef.current?.value ?? "").trim();

        // TODO: Email and password validation.

        const newState: ErrorMessageState = {}

        if(givenEmail.length === 0) {
            newState.email = "Please fill this field."
        } else if(givenEmail.length < 3) {
            newState.email = "Email address is too short."
        } else if(givenEmail.length > 254) {
            newState.email = "Email address is too long."
        } else if(!givenEmail.includes('@')) {
            newState.email = "A valid email address requires @ symbol."
        } else if(givenPass.length === 0) {
            newState.pass = "Please fill this field."
        } else if(givenPass.length < 8) {
            newState.pass = "Password is too short."
        } else if(givenPass.length > 32) {
            newState.pass = "Password is too long."
        } else if(givenRepPass.length === 0) {
            newState.repPass = "Please fill this field."
        } else if(givenRepPass !== givenPass) {
            newState.pass = "Passwords don't match."
            newState.repPass = "Passwords don't match."
        }

        setErrors(newState);
        if (newState.email || newState.pass || newState.repPass) return;

        setProcessing(true);
        try {
            await authContext.registerUser(givenEmail, givenPass);
            navigate('/login');
        } catch(err) {
            setSubmitErr(err instanceof Error? err.message : "An error occured. Please try again.");
        }
        setProcessing(false);
    }

    const onInput = () => {
        setErrors({})
        setSubmitErr(undefined)
    }

    return (
        <div className='register-page' data-testid='Register'>
            <Form formTitle='Register' onSubmit={onSubmit} onInput={onInput}>
                <FormEmailField id="email" label='E-Mail Address:' ref={emailRef} error={errors.email} />
                <FormPasswordField id="password" label='Password:' ref={passRef} error={errors.pass} />
                <FormPasswordField id="repeat-password" label='Repeat password:' ref={repPassRef} error={errors.repPass} />
                <FormSubmit disabled={processing} text={processing? "Creating account..." : "Create Account"} error={submitErr} />
                <Link to='/login'>Already have an account?</Link>
            </Form>
        </div>  
    )
}

export default Register