import React, { useContext, useEffect } from 'react'
import { ItemsContext } from "Common/State/TodoItemsContext";
import { TodoList } from "Components/TodoList/TodoList";


interface Props {

}

export const Today: React.FC<Props> = () => {

    const fetchTodos = async () => {
        // make ensureTokenAccess() function to run before every such request

    }

    useEffect(() => {}, [])

    const items = useContext(ItemsContext)

    return (
        <TodoList items={items}/>
    )
}