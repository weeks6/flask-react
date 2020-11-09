import { Priorities } from 'Common/Todo/PrioritiesEnum'

export interface TodoItem {
    user_id?: string,
    project_id?: string,
    project_title: string,
    date: string,
    completed: boolean,
    title: string,
    description: string,
    priority: keyof typeof Priorities,
    experience: number
}