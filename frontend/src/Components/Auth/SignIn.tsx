import './Form.css'
import React, { FormEvent, useState } from 'react'
import { Button, TextField } from "@material-ui/core";
import axios from 'axios';
import { useHistory } from 'react-router';
import { User } from 'Common/State/AuthContext';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const SignIn: React.FC<Props> = ({setUser}) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const SignIn = (e: FormEvent) => {
        e.preventDefault()

        const url = `http://${process.env.REACT_APP_BACKEND}/api/auth/signin`

        axios.post(url, {
            email,
            password
        }).then(res => {
            if (res.status === 200) {
                const url = `http://${process.env.REACT_APP_BACKEND}/api/auth/user`
                localStorage.setItem('actk', res.data.access_token)
                localStorage.setItem('rftk', res.data.refresh_token)
                
                axios.get(url, {
                    data: {
                        'refresh_token': localStorage.getItem('rftk')
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('actk')}`
                    }
                }).then(res => {
                    setUser(res.data)
                })
                .catch(e => console.log(e))

                history.push('/today')
            }
        })
        .catch(e => console.log(e))

    }

    return (
        <form onSubmit={e => SignIn(e)} className='form'>
            <TextField type='email' value={email} onChange={e => setEmail(e.target.value)} label="Email"></TextField>
            <TextField type='password' value={password} onChange={e => setPassword(e.target.value)} label="Password"></TextField>
            <Button type='submit'>Sign In</Button>
        </form> 
    )
}