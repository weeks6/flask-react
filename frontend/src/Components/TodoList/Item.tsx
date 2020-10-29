import React from 'react'
import { Priorities } from './EPriority'
import { Priority } from './Priority'
import { ReactComponent as DragIcon } from "Images/Icons/drag_indicator-24px.svg"
import {Ripple} from "Common/ripple"
import './List.css'

export interface IItem {
  title: string
  exp: number
  priority: keyof typeof Priorities
  description?: string
  timestamp?: number
  completed: boolean 
}

export interface ItemProps {
    item: IItem,
    ripple?: boolean
}

export const Item: React.FC<ItemProps> = ({item, ripple}) => {

  const {title, description, exp, priority} = item

    return (
      <div className="todo-wrapper" onClick={event => ripple && Ripple(event)}>
        <input className="checkbox" type="checkbox"></input>
        <div className="todo-content">
          <div className="todo-heading">
            <div className="todo-title">{title}</div>
            <div className="todo-exp">{exp}</div>
          </div>
          <div className="todo-description">{description}</div>
        </div>
        <Priority priority={priority} />
        <div className="dragndrop">
          <DragIcon fill="#CBCBCB"/>
        </div>
      </div>
    )
}

export default Item