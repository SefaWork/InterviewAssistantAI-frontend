import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import './Register.css'
import { useRef, useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth';
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';
import { useTranslation } from 'react-i18next';

interface ErrorMessageState {
    email?: string | undefined,
    pass?: string | undefined,
    repPass?: string | undefined
}

function Register() {
    const {t} = useTranslation();

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
            newState.email = t("error.empty_field")
        } else if(givenEmail.length < 3) {
            newState.email = t("error.too_short", {length: 3})
        } else if(givenEmail.length > 254) {
            newState.email = t("error.too_long", {length: 254})
        } else if(!givenEmail.includes('@')) {
            newState.email = t("error.missing_email_symbol")
        } else if(givenPass.length === 0) {
            newState.pass = t("error.empty_field")
        } else if(givenPass.length < 8) {
            newState.pass = t("error.too_short", {length: 8})
        } else if(givenPass.length > 32) {
            newState.pass = t("error.too_long", {length: 32})
        } else if(givenRepPass.length === 0) {
            newState.repPass = t("error.empty_field")
        } else if(givenRepPass !== givenPass) {
            newState.pass = t("error.password_mismatch")
            newState.repPass = newState.pass
        }

        setErrors(newState);
        if (newState.email || newState.pass || newState.repPass) return;

        setProcessing(true);
        try {
            await authContext.registerUser(givenEmail, givenPass);
            navigate('/login');
        } catch(err) {
            setSubmitErr(err instanceof Error? t(err.message) : t("error.generic"));
        }
        setProcessing(false);
    }

    const onInput = () => {
        setErrors({})
        setSubmitErr(undefined)
    }

    return (
        <div className='register-page' data-testid='Register'>
            <Form formTitle={t("register")} onSubmit={onSubmit} onInput={onInput}>
                <FormEmailField id="email" label={`${t("field.email")}:`} ref={emailRef} error={errors.email} />
                <FormPasswordField id="password" label={`${t("field.password")}:`} ref={passRef} error={errors.pass} />
                <FormPasswordField id="repeat-password" label={`${t("field.repeat_password")}:`} ref={repPassRef} error={errors.repPass} />
                <FormSubmit disabled={processing} text={processing? `${t("registering")}...` : t("register")} error={submitErr} />
                <Link to='/login'>{t("existing_account")}</Link>
            </Form>
        </div>  
    )
}

export default Register