import React from 'react'
import { Priorities } from "Common/Todo/PrioritiesEnum"

interface Props {
    priority: keyof typeof Priorities
}

export const Priority: React.FC<Props> = ({priority}) => {

    let bgColor

    switch (priority) {
        case "Low":
            bgColor = "#64DD17"
            break;
        case "Average":
            bgColor = "#FDD835"
            break;
        case "High":
            bgColor = "#FB8C00"
            break;
        case "Great":
            bgColor = "#F44336"
            break;
        default:
            bgColor = "transparent"
            break;
    }

    return (
        <div className="priority" style={{backgroundColor: bgColor}}></div>
    )
}