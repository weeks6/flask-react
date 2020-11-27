import React, { useContext, useEffect, useState } from 'react'
import { ItemsContext } from "Common/State/TodoItemsContext";
import { TodoList } from "Components/TodoList/TodoList";
import { Drawer, DrawerTitle } from 'Components/Drawer/Drawer';
import { TodoItem } from 'Common/Todo/ItemInterface';
import { AddFab } from 'Components/Controls/AddFab';
import { ErrorMessage, Field, Form, Formik, FieldProps } from 'formik';

import 'Components/Today/Today.css'
import { TextField } from 'Components/Controls/TextField/TextField'
import { MenuItem, FormControl, InputLabel, Button } from '@material-ui/core';
import { Priorities } from 'Common/Todo/PrioritiesEnum';
import { Select, Option } from 'Components/Controls/Select/Select'
import { SaveTodo, TodoRequest } from 'Common/Todo/ApiRequests';
import { refreshAccessToken } from 'Common/Auth/ApiRequests';
import { useHistory } from 'react-router';


interface Props {
}

export const Today: React.FC<Props> = () => {

    const { todos, setAllTodos } = useContext(ItemsContext)

    const createTodo = async (values: TodoItem, setSubmitting: (isSubmitting: boolean) => void) => {
        setSubmitting(true)

        const response = await SaveTodo(values)

        if (response?.status === 200) {
            
            setAllTodos([...todos, response.data])

            formValues.project_title = ''
            formValues.title = ''
            formValues.description = ''
            formValues.completed = false
            formValues.date = ''
            // formValues.experience = 0
            formValues.priority = 'Average'
            setSubmitting(false)
            setDrawer({ ...drawer, active: false })
        }
    }

    const [drawer, setDrawer] = useState({
        active: false,
        todo: {} as TodoItem
    })

    const formValues: TodoItem = {
        project_title: '',
        title: '',
        description: '',
        completed: false,
        date: '',
        // experience: 0,
        priority: 'Average'
    }

    const PrioritiesArr = Object.values(Priorities)

    return (
        <div className="today-body">
            <TodoList items={todos} />
            <AddFab onClick={() => {
                setDrawer({ todo: {} as TodoItem, active: !drawer.active })
            }} />
            <Drawer active={drawer.active} setDrawer={setDrawer}>
                <DrawerTitle text="New task for today" />
                <Formik
                    initialValues={formValues}
                    onSubmit={(values, { setSubmitting }) => createTodo(values, setSubmitting)}
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
                            </Field> */}
                            <ErrorMessage name="experience" component="div" />

                            <Field as="select" name="priority">
                                {PrioritiesArr.map((value, idx) => <option value={value} key={idx}>{value}</option>)}
                            </Field>
                            <ErrorMessage name="priority" component="div" />
                            <button type="submit" disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </Drawer>
        </div>
    )
}