import React from 'react'
import { Item, IItem } from "./Item";

interface Props {
    items: Array<IItem>
}

export const TodoList: React.FC<Props> = ({items}) => {

    const listItems = items.map((item, idx) => 
        <Item item={item} key={idx} ripple/>
    )

    return (
        <ul className="todo-list">
            {listItems}
        </ul>
    )
}
