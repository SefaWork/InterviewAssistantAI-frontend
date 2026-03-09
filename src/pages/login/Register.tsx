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
            <Form formTitle='Register' error={submitErr} onSubmit={onSubmit}>
                <FormEmailField id="email" label='E-Mail Address:' ref={emailRef} error={errors.email} />
                <FormPasswordField id="password" label='Password:' ref={passRef} error={errors.pass} />
                <FormPasswordField id="repeat-password" label='Repeat password:' ref={repPassRef} error={errors.repPass} />
                <FormSubmit disabled={processing} text={processing? "Creating account..." : "Create Account"} />
                <Link to='/login'>Already have an account?</Link>
            </Form>
        </div>  
    )
}

export default Register