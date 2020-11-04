import './Form.css'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { Field } from "Components/Auth/Field";

interface FormFields {
    email?: string
    password?: string
}

export const SignIn: React.FC = () => {

    const [cookie, setCookie] = useState('')

    // TODO: come up with a better way to set initial form state
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    } as FormFields)

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormState({...formState, email: e.target.value})
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormState({...formState, password: e.target.value})
    }

    const submitSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = `http://${process.env.REACT_APP_BACKEND}/api/auth/signin`
        const payload = formState
        
        axios.post(url, {data: JSON.stringify(payload)})
            .then(res => {
                console.log(document.cookie)
                setCookie(res.headers['Set-Cookie'])
            })
            .catch(console.log)
    }

    return (
        <>
            <form className="form" onSubmit={(e) => submitSignIn(e)}>
                <Field type="email" label="Email" value={formState.email} changeHandle={handleEmailChange}/>
                <input type="password" value={formState.password} onChange={e => handlePasswordChange(e)}/>
                <input type="submit" value="Submit"/>
            </form>

            {cookie}
        </>
    )
}