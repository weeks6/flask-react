import React, { useContext, useEffect, useState } from 'react'
import { ItemsContext } from "Common/State/TodoItemsContext";
import { TodoList } from "Components/TodoList/TodoList";
import { Drawer, DrawerTitle } from 'Components/Drawer/Drawer';
import { TodoItem } from 'Common/Todo/ItemInterface';
import { AddFab } from 'Components/Controls/AddFab';

import 'Components/Today/Today.css'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core';
import { Priorities } from 'Common/Todo/PrioritiesEnum';


interface Props {

}

export const Today: React.FC<Props> = () => {

    const fetchTodos = async () => {
        // make ensureTokenAccess() function to run before every such request

    }

    const createTodo = async (e: React.FormEvent) => {
        e.preventDefault()

    }   

    useEffect(() => {}, [])

    const items = useContext(ItemsContext)
    const [drawer, setDrawer] = useState({
        active: false,
        todo: {} as TodoItem
    })

    return (
        <div className="today-body">
            <TodoList items={items}/>
            <AddFab onClick={() => {
                setDrawer({...drawer, active: !drawer.active})
            }}/>
            <Drawer active={drawer.active} setDrawer={setDrawer}>
                <DrawerTitle text="New task for today" />
                <form className="todo-form" onSubmit={createTodo}>
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
                </form>
            </Drawer>
        </div>
    )
}