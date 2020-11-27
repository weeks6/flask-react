import axios, {AxiosError} from 'axios'
import {getAccessToken} from 'Common/Auth/Tokens'
import { TodoItem } from './ItemInterface'

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

export const SaveTodo = async (todoItem: TodoItem) => {
    const API_SAVE_TODO = `http://${process.env.REACT_APP_BACKEND}/api/todos/new`

    const response = axios.post(API_SAVE_TODO, todoItem, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }}).catch((err: AxiosError) => {
          return err.response
    })

    return response
}


export const EditTodo = async (todoItem: TodoItem) => {
    const API_EDIT_TODO = `http://${process.env.REACT_APP_BACKEND}/api/todos/edit`

    const response = axios.post(API_EDIT_TODO, todoItem, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }}).catch((err: AxiosError) => {
          return err.response
    })

    return response
}

export const DeleteTodo = async (id: string) => {
    const API_DELETE_TODO = `http://${process.env.REACT_APP_BACKEND}/api/todos/delete/one`

    const response = axios.post(API_DELETE_TODO, {id}, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }}).catch((err: AxiosError) => {
          return err.response
    })

    return response
}