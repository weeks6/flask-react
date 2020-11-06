import './Form.css'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Field } from "Components/Auth/Field";
import { AuthContext } from "Common/State/AuthContext"

interface FormFields {
    email?: string
    password?: string
}

export const SignIn: React.FC = () => {

    const history = useHistory()

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

        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            credentials: "include",
            body: JSON.stringify(payload)
        }) 
            .then(res => {
                if (res.status === 200) {
                    return res
                } else {
                    throw new Error('Wrong creds')
                }
            })
            .then(res => res.json())
            .then(data =>{
                localStorage.setItem('jid', data.access_token)
                history.push('/profile')
                
            })
            .catch(e => console.log(e))
        }

    return (
        <>
            <form className="form" onSubmit={(e) => submitSignIn(e)}>
                <Field type="email" label="Email" value={formState.email} onChange={handleEmailChange}/>
                <Field type="password" label="Password" value={formState.password} onChange={handlePasswordChange}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}