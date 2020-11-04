import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

interface FormFields {
    name?: string
    email?: string
    password?: string
}

export const SignUp: React.FC = () => {

    // TODO: come up with a better way to set initial form state
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: ''
    } as FormFields)

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormState({...formState, name: e.target.value})
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormState({...formState, email: e.target.value})
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormState({...formState, password: e.target.value})
    }

    const submitSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = `http://${process.env.REACT_APP_BACKEND}/api/auth/signup`
        const payload = formState
        console.log(JSON.stringify(payload));
        
        axios.post(url, {data: JSON.stringify(payload)})
            .then(res => console.log(res))
            .catch(console.log)
    }

    return (
        <form onSubmit={(e) => submitSignUp(e)}>
            <input type="text" value={formState.name} onChange={e => handleNameChange(e)}/>
            <input type="email" value={formState.email} onChange={e => handleEmailChange(e)}/>
            <input type="password" value={formState.password} onChange={e => handlePasswordChange(e)}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}