import React, { useState } from 'react'
import { TodoItem } from 'Common/Todo/ItemInterface'
import { Priority } from './Priority'
import { ReactComponent as DragIcon } from "Images/Icons/drag_indicator-24px.svg"
import {Ripple} from "Common/ripple"
import './List.css'
import {Checkbox} from '@material-ui/core'

export interface ItemProps {
    todo: TodoItem,
    ripple?: boolean
}

export const Item: React.FC<ItemProps> = ({todo, ripple}) => {

  const [item, setItem] = useState(todo)
  const {project_title, title, experience, priority, date, completed} = item

  const completeTodo = () => {
    setItem({...item, completed: !completed,})
  }

  return (
    <>
      <div className="todo-item">
        <Priority priority={priority}/>
        <Checkbox checked={completed} onClick={completeTodo}/>
        <div className="todo-item__body">
          <div className="todo-item__body-upper">
            <p className="todo-item__project-name">{project_title}</p>
            <span className="todo-item__experience">{experience}</span>
            <span className="todo-item__date">{date}</span>
          </div>
        <h2 className="todo-item__title">{title}</h2>
        </div>
      </div>
    </>
  )
}

export default Item