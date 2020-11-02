import React, { ChangeEvent, FormEvent, useState } from 'react'
// import useFetch from 'Common/Hooks/useFetch'
import axios from 'axios'

interface FormFields {
    email?: string
    password?: string
}

export const SignIn: React.FC = () => {

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
        axios.post(url, JSON.stringify(payload))
            .then(res => console.log(res))
            .catch(console.log)
    }

    return (
        <form onSubmit={(e) => submitSignIn(e)}>
            <input type="email" value={formState.email} onChange={e => handleEmailChange(e)}/>
            <input type="password" value={formState.password} onChange={e => handlePasswordChange(e)}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}