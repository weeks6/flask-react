import React from 'react'
import { TodoItem } from 'Common/Todo/ItemInterface';
import { Item } from "./Item";

interface Props {
    items: TodoItem[]
}

export const TodoList: React.FC<Props> = ({items}) => {

    const listItems = items.map((item, idx) => 
        <Item todo={item} key={idx} ripple/>
    )

    return (
        <ul className="todo-list">
            {listItems}
        </ul>
    )
}
