import axios, {AxiosError} from 'axios'
import {getAccessToken} from 'Common/Auth/Tokens'

export const TodoRequest = async () => {
    const API_TODOS = `http://${process.env.REACT_APP_BACKEND}/api/todos/all`

    const response = axios.get(API_TODOS, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }}).catch((err: AxiosError) => {
          return err.response
    })

    return response

}