import React, { useContext } from 'react'
import { ItemsContext } from "Common/State/TodoItemsContext";
import { TodoList } from "Components/TodoList/TodoList";


interface Props {

}

export const Today: React.FC<Props> = () => {

    const items = useContext(ItemsContext)

    return (
        <TodoList items={items}/>
    )
}