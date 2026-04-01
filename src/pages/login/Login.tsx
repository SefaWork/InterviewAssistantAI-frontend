import type { LocalizedMessage } from '../../types/i18n';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/form/Form';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import './Login.css'

interface ErrorMessageState {
    email?: LocalizedMessage,
    pass?: LocalizedMessage,
    submit?: LocalizedMessage
}

function Login() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const auth = useAuth();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});
    const [processing, setProcessing] = useState<boolean>(false);

    /**Helper function to translate messages with parameter support. */
    const localizeMessage = (msg: LocalizedMessage) => msg.params? t(msg.key, msg.params) : t(msg.key);

    const action = async (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = (emailRef.current?.value ?? "").trim();
        const givenPassword = (passRef.current?.value ?? "").trim();
        
        const newState: ErrorMessageState = {};
        
        if(givenEmail.length === 0) {
            newState.email = {key: "error.empty_field"}
        } else if(givenEmail.length < 3) {
            newState.email = {key: "error.too_short", params: {length: 3}}
        } else if(givenEmail.length > 254) {
            newState.email = {key: "error.too_long", params: {length: 254}}
        } else if(!givenEmail.includes('@')) {
            newState.email = {key: "error.missing_email_symbol"}
        } else if(givenPassword.length === 0) {
            newState.pass = {key: "error.empty_field"}
        } else if(givenPassword.length < 8) {
            newState.pass = {key: "error.too_short", params: {length: 8}}
        } else if(givenPassword.length > 32) {
            newState.pass = {key: "error.too_long", params: {length: 32}}
        }
        
        if(newState.email || newState.pass) return setErrors(newState);
        
        setProcessing(true);
        try {
            const result = await auth.login(givenEmail, givenPassword);
            if (result.success) return navigate('/'); 
            newState.submit = result.reason ?? {key: "error.generic"}
        } catch(err) {
            newState.submit = {key: err instanceof Error ? err.message : "error.generic"}
        }

        setErrors(newState);
        setProcessing(false);
    }

    const onInput = () => {
        setErrors({})
    }

    useEffect(() => {
        if (auth.accessToken) {
            // Already logged in.
            navigate('/');
        }
    }, [])

    return (
        <div className='login-page' data-testid="Login">
            <Form formTitle={t("login")} onSubmit={action} onInput={onInput}>        
                <FormEmailField id='email' label={`${t("field.email")}:`} error={errors.email && localizeMessage(errors.email)} ref={emailRef} />
                <FormPasswordField id='password' label={`${t("field.password")}:`} error={errors.pass && localizeMessage(errors.pass)} ref={passRef} />
                <FormSubmit disabled={processing} text={processing? `${t("logging_in")}...` : t("login")} error={errors.submit && localizeMessage(errors.submit)} />
                <Link to='/register'>{t("new_account")}</Link>
            </Form>
        </div>
    )
}

export default Login;