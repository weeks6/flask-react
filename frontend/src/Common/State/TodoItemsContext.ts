import React from 'react'
import { TodoItem } from "Common/Todo/ItemInterface";
import { Priorities } from 'Common/Todo/PrioritiesEnum';

export const MOCKUP_ITEMS: TodoItem[] = [
    {
      user_id: "bruhruhbr",
      project_id: "awdawdawdawd",
      project_title: "awdawda",
      date: "23.11.2020",
      title: "Test Title",
      experience: 1000,
      priority: Priorities.Average,
      completed: false,
      description: "Test Description wdawdwadadawdawdawdawd"
    }
]

export const ItemsContext = React.createContext(MOCKUP_ITEMS)
export const ItemsProvider = ItemsContext.Provider