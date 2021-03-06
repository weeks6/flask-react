import React, { useContext, useState } from 'react'
import { TodoItem } from 'Common/Todo/ItemInterface'
import { Priority } from './Priority'
import { Ripple } from "Common/ripple"
import './List.css'
import { Checkbox } from '@material-ui/core'
import { Drawer, DrawerTitle } from 'Components/Drawer/Drawer'
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik'
import { TextField } from 'Components/Controls/TextField/TextField'
import { Priorities } from 'Common/Todo/PrioritiesEnum'
import { DeleteTodo, EditTodo } from 'Common/Todo/ApiRequests'
import { ItemsContext } from 'Common/State/TodoItemsContext'
import { ReactComponent as DeleteIconSvg } from 'Images/Icons/delete-24px.svg'

export interface ItemProps {
  todo: TodoItem,
  ripple?: boolean,
  idx: any,
}

export const Item: React.FC<ItemProps> = ({ todo, idx }) => {

  const { setOneTodo, deleteOneTodo } = useContext(ItemsContext)

  const [item, setItem] = useState(todo)
  const { project_title, title, priority, date, completed, description } = item

  const completeTodo = async () => {
    const response = await EditTodo({...item, completed: !completed})

    if (response?.status === 200) {
        // update context
        // console.log(response.data);
        
        setOneTodo(idx, response.data)
        setItem({ ...item, completed: !completed, })
    }
  }

  const deleteTodo = async () => {
    const response = await DeleteTodo(item._id!)

    if (response?.status === 200) deleteOneTodo(idx)
  }

  const editTodo = async (values: TodoItem, setSubmitting: (isSubmitting: boolean) => void) => {
    setSubmitting(true)
    // console.log({...item, ...values});
    
    const response = await EditTodo({...item, ...values})

    if (response?.status === 200) {
        // update context
        setOneTodo(idx, response.data)
        setItem(response.data)
        setSubmitting(false)
        setDrawer({...drawer, active: false})
    }
}   


  const PrioritiesArr = Object.values(Priorities)

  const [drawer, setDrawer] = useState({
    active: false,
    todo
  })

  const formValues: TodoItem = {
    project_title,
    title,
    description,
    completed: false,
    date,
    // experience,
    priority
  }

  return (
    <>
      <div className="todo-item" onClick={(e) => {
        Ripple(e)
      }}>
        <Priority priority={priority} />
        <Checkbox checked={completed} onClick={completeTodo} />
        <div className="todo-item__body" onClick={() => setDrawer({...drawer, active: !drawer.active})}>
          <div className="todo-item__body-upper">
            <p className="todo-item__project-name">{project_title}</p>
            {/* <span className="todo-item__experience">{experience}</span> */}
            <span className="todo-item__date">{date}</span>
          </div>
          <h2 className="todo-item__title">{title}</h2>
        </div>
        <span className="delete-button" onClick={() => {deleteTodo()}}>
          <DeleteIconSvg />
        </span>
      </div>
      <Drawer active={drawer.active} setDrawer={setDrawer}>
        <DrawerTitle text="Edit task" />
        <Formik
          initialValues={formValues}
          onSubmit={(values, { setSubmitting }) => editTodo(values, setSubmitting)}
        >
          {({ isSubmitting }) => (
            <Form className='todo-form'>
              <Field name="project_title">
                {({ field }: FieldProps) => <TextField type="text" label="Project Title" {...field} />}
              </Field>
              <ErrorMessage name="project_title" component="div" />

              <Field name="title">
                {({ field }: FieldProps) => <TextField type="text" label="Title" {...field} />}
              </Field>
              <ErrorMessage name="title" component="div" />

              <Field name="description">
                {({ field }: FieldProps) => <TextField type="text" label="Description" {...field} />}
              </Field>
              <ErrorMessage name="description" component="div" />

              <Field name="date">
                {({ field }: FieldProps) => <TextField type="date" label="Date" {...field} />}
              </Field>
              <ErrorMessage name="date" component="div" />

              {/* <Field name="experience">
                {({ field }: FieldProps) => <TextField type="number" label="Experience" {...field} />}
              </Field>
              <ErrorMessage name="experience" component="div" /> */}

              <Field as="select" name="priority">
                {PrioritiesArr.map((value, idx) => <option value={value} key={idx}>{value}</option>)}
              </Field>
              <ErrorMessage name="priority" component="div" />
              <button type="submit" disabled={isSubmitting}>Save</button>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
    
  )
}

export default Item