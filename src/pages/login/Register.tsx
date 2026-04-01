import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import FormEmailField from '../../components/form/FormEmailField';
import FormPasswordField from '../../components/form/FormPasswordField';
import FormSubmit from '../../components/form/FormSubmit';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import type { LocalizedMessage } from '../../types/i18n';
import './Register.css'
import axiosServer from '../../api/axiosServer';
import axios from 'axios';

interface ErrorMessageState {
    email?: LocalizedMessage,
    pass?: LocalizedMessage,
    repPass?: LocalizedMessage,
    submit?: LocalizedMessage
}

function Register() {
    const {t} = useTranslation();
    const auth = useAuth();

    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const repPassRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<ErrorMessageState>({});
    const [processing, setProcessing] = useState<boolean>(false);

    const localizeMessage = (msg: LocalizedMessage) => msg.params? t(msg.key, msg.params) : t(msg.key);

    const register = async (email: string, password: string) => {
        try {
            await axiosServer.post("/api/auth/register/", {email, password});
            return {success: true}
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                switch (err.response.status) {
                    case 409:
                        return {success: false, reason: {key: "error.email_exists"}}
                    case 403:
                        return {success: false, reason: {key: "error.forbidden"}}
                    default:
                        return {success: false, reason: {key: "error.server_error"}}
                }
            }
        }

        return {success: false, reason: {key: "error.server_unreachable"}}
    }
    
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const givenEmail = (emailRef.current?.value ?? "").trim();
        const givenPass = (passRef.current?.value ?? "").trim();
        const givenRepPass = (repPassRef.current?.value ?? "").trim();

        // TODO: Email and password validation.

        const newState: ErrorMessageState = {}

        if(givenEmail.length === 0) {
            newState.email = {key: "error.empty_field"}
        } else if(givenEmail.length < 3) {
            newState.email = {key: "error.too_short", params: {length: 3}}
        } else if(givenEmail.length > 254) {
            newState.email = {key: "error.too_long", params: {length: 254}}
        } else if(!givenEmail.includes('@')) {
            newState.email = {key: "error.missing_email_symbol"}
        } else if(givenPass.length === 0) {
            newState.pass = {key: "error.empty_field"}
        } else if(givenPass.length < 8) {
            newState.pass = {key: "error.too_short", params: {length: 8}}
        } else if(givenPass.length > 32) {
            newState.pass = {key: "error.too_long", params: {length: 32}}
        } else if(givenRepPass.length === 0) {
            newState.repPass = {key: "error.empty_field"}
        } else if(givenRepPass !== givenPass) {
            newState.pass = {key: "error.password_mismatch"}
            newState.repPass = newState.pass
        }

        // Return early if there was an error.
        if (newState.email || newState.pass || newState.repPass) return setErrors(newState);

        setProcessing(true);

        try {
            const result = await register(givenEmail, givenPass);
            if (result.success) return navigate('/login');
            
            newState.submit = result.reason ?? {key: "error.generic"}
        } catch(err) {
            newState.submit = {key: err instanceof Error? err.message : "error.generic"};
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
        <div className='register-page' data-testid='Register'>
            <Form formTitle={t("register")} onSubmit={onSubmit} onInput={onInput}>
                <FormEmailField id="email" label={`${t("field.email")}:`} ref={emailRef} error={errors.email && localizeMessage(errors.email)} />
                <FormPasswordField id="password" label={`${t("field.password")}:`} ref={passRef} error={errors.pass && localizeMessage(errors.pass)} />
                <FormPasswordField id="repeat-password" label={`${t("field.repeat_password")}:`} ref={repPassRef} error={errors.repPass && localizeMessage(errors.repPass)} />
                <FormSubmit disabled={processing} text={processing? `${t("registering")}...` : t("register")} error={errors.submit && localizeMessage(errors.submit)} />
                <Link to='/login'>{t("existing_account")}</Link>
            </Form>
        </div>  
    )
}

export default Register