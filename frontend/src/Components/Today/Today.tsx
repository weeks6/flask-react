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
import {Select, Option} from 'Components/Controls/Select/Select'
import { SaveTodo, TodoRequest } from 'Common/Todo/ApiRequests';


interface Props {
    setTodos: any
}

export const Today: React.FC<Props> = ({setTodos}) => {

    const items = useContext(ItemsContext)

    const fetchTodos = async () => {
        // make ensureTokenAccess() function to run before every such request

        const response = await TodoRequest()

        if (response?.status === 200) {
            setTodos(response.data)
        }

    }   

    const createTodo = async (values: TodoItem, setSubmitting:  (isSubmitting: boolean) => void) => {
        setSubmitting(true)
        
        const response = await SaveTodo(values)

        if (response?.status === 200) {
            // update context
            setTodos([...items, values])
            setSubmitting(false)
        }
    }   

    useEffect(() => {fetchTodos()}, [])
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
        experience: 0,
        priority: 'Average'
    }

    const PrioritiesArr = Object.values(Priorities)

    return (
        <div className="today-body">
            <TodoList items={items}/>
            <AddFab onClick={() => {
                setDrawer({...drawer, active: !drawer.active})
            }}/>
            <Drawer active={drawer.active} setDrawer={setDrawer}>
                <DrawerTitle text="New task for today" />
                <Formik
                    initialValues={formValues}
                    onSubmit={(values, { setSubmitting }) => createTodo(values, setSubmitting)}
                    >
                    {({ isSubmitting }) => (
                        <Form className='todo-form'>
                            <Field name="project_title">
                                {({field}: FieldProps) => <TextField type="text" label="Project Title" {...field}/>}
                            </Field>
                            <ErrorMessage name="project_title" component="div" />

                            <Field name="title">
                                {({field}: FieldProps) => <TextField type="text" label="Title" {...field}/>}
                            </Field>
                            <ErrorMessage name="title" component="div" />

                            <Field name="description">
                                {({field}: FieldProps) => <TextField type="text" label="Description" {...field}/>}
                            </Field>
                            <ErrorMessage name="description" component="div" />

                            <Field name="date">
                                {({field}: FieldProps) => <TextField type="date" label="Date" {...field}/>}
                            </Field>
                            <ErrorMessage name="date" component="div" />

                            <Field name="experience">
                                {({field}: FieldProps) => <TextField type="number" label="Experience" {...field}/>}
                            </Field>
                            <ErrorMessage name="experience" component="div" />
                            
                            <Field as="select" name="priority">
                                {PrioritiesArr.map((value, idx) => <option value={value} key={idx}>{value}</option>)}
                            </Field>
                            <ErrorMessage name="priority" component="div" />
                            <Button type="submit" disabled={isSubmitting}>Add</Button>
                        </Form>
                    )}
                    </Formik>
                {/* <form className="todo-form" onSubmit={createTodo}>
                    <TextField type="text" label="Title"/>
                    <TextField type="textarea" label="Description"/>
                    <FormControl >
                    <InputLabel id="priority-select">Priority</InputLabel>
                        <Select labelId="priority-select">
                            <MenuItem value={Priorities.Low}>{Priorities.Low}</MenuItem>
                            <MenuItem value={Priorities.Average}>{Priorities.Average}</MenuItem>
                            <MenuItem value={Priorities.High}>{Priorities.High}</MenuItem>
                            <MenuItem value={Priorities.Great}>{Priorities.Great}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField type="number" label="Experience"/>
                    <TextField type="date" label="Date"/>
                    <Button type="submit">Add</Button>
                </form> */}
            </Drawer>
        </div>
    )
}