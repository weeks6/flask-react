import React, { useContext, useState } from 'react'
import { TodoItem } from "Common/Todo/ItemInterface";

interface TodosContext {
  todos: TodoItem[],
  setAllTodos: (todos: TodoItem[]) => void,
  setOneTodo: (idx: number, todo: TodoItem) => void,
  deleteOneTodo: (idx: number) => void
}

const TODOS_DEFAULT_VALUE: TodosContext = {
  todos: [],
  setAllTodos: () => {},
  setOneTodo: () => {},
  deleteOneTodo: () => {}
}

export const useTodos = () => {
    const [todos, setTodos] = useState([] as TodoItem[])

    const setAllTodos = (newTodos: TodoItem[]) => {
      setTodos(newTodos)
    }

    const setOneTodo = (todo_idx: number, todo: TodoItem) => {
      // console.log(todos);
      
      const newTodos = todos.map((val, idx) => {
        if (idx === todo_idx) {
          return todo
        } else return val
      })
      
      setTodos(newTodos)
    }

    const deleteOneTodo = (idx: number) => {
        const newTodos = todos.filter((_, id) => idx !== id)
        setTodos(newTodos)
    }

    return {
      todos,
      setAllTodos,
      setOneTodo,
      deleteOneTodo
    }
}

export const ItemsContext = React.createContext<TodosContext>(TODOS_DEFAULT_VALUE)
export const ItemsProvider = ItemsContext.Provider
export const ItemsConsumer = ItemsContext.Consumer