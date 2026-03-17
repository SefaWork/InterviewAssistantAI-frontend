import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import { useRef, useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';
import './Login.css'
import { useTranslation } from 'react-i18next';

interface ErrorMessageState {
    emailErr?: string | undefined,
    passErr?: string | undefined
}

function Login() {
    const authContext = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

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
            newState.emailErr = t("error.empty_field")
        } else if(givenEmail.length < 3) {
            newState.emailErr = t("error.too_short", {length: 3})
        } else if(givenEmail.length > 254) {
            newState.emailErr = t("error.too_long", {length: 254})
        } else if(!givenEmail.includes('@')) {
            newState.emailErr = t("error.missing_email_symbol")
        } else if(givenPassword.length === 0) {
            newState.passErr = t("error.empty_field")
        } else if(givenPassword.length < 8) {
            newState.passErr = t("error.too_short", {length: 8})
        } else if(givenPassword.length > 32) {
            newState.passErr = t("error.too_long", {length: 32})
        }
        
        setErrors(newState)
        if(newState.emailErr || newState.passErr) return;
        
        setProcessing(true);
        try {
            await authContext.fetchTokens(givenEmail, givenPassword);
            navigate('/');
        } catch(err) {
            setSubmitErr(err instanceof Error ? t(err.message) : t("error.generic"))
        }
        setProcessing(false);
    }

    const onInput = () => {
        setErrors({})
        setSubmitErr(undefined)
    }

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle={t("login")} onSubmit={action} onInput={onInput}>        
                <FormEmailField id='email' label={`${t("field.email")}:`} error={errors['emailErr']} ref={emailRef} />
                <FormPasswordField id='password' label={`${t("field.password")}:`} error={errors['passErr']} ref={passRef} />
                <FormSubmit disabled={processing} text={processing? `${t("loggingIn")}...` : t("login")} error={submitErr} />
                <Link to='/register'>{t("new_account")}</Link>
            </Form>
        </div>
    )
}

export default Login;