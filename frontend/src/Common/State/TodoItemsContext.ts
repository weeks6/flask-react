import React from 'react'
import { IItem } from "Components/TodoList/Item";

export const MOCKUP_ITEMS: Array<IItem> = [
    {
      title: "Test Title",
      exp: 1000,
      priority: "Average",
      completed: false,
      description: "Test Description wdawdwadadawdawdawdawd"
    },
    {
      title: "Test Title loawdjawdawydvuadawdauiwdgawdugaiwda",
      exp: 500,
      priority: "High",
      completed: false,
      description: "Test Description wdawdwadadawdawdawdawd"
    },
    {
      title: "Test Title",
      exp: 1000,
      priority: "Low",
      completed: false,
      description: "Test Description wdawdwadadawdawdawdawd"
    },
    {
      title: "Test Title",
      exp: 700,
      priority: "Average",
      completed: false,
      description: "Test Description wdawdwadadawdawdawdawd"
    },
    {
        title: "Test Title",
        exp: 1000,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title loawdjawdawydvuadawdauiwdgawdugaiwda",
        exp: 500,
        priority: "High",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Low",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 700,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title loawdjawdawydvuadawdauiwdgawdugaiwda",
        exp: 500,
        priority: "High",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Low",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 700,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title loawdjawdawydvuadawdauiwdgawdugaiwda",
        exp: 500,
        priority: "High",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Low",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 700,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title loawdjawdawydvuadawdauiwdgawdugaiwda",
        exp: 500,
        priority: "High",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 1000,
        priority: "Low",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
      {
        title: "Test Title",
        exp: 700,
        priority: "Average",
        completed: false,
        description: "Test Description wdawdwadadawdawdawdawd"
      },
  ]
  
  export const ItemsContext = React.createContext(MOCKUP_ITEMS)
  export const ItemsProvider = ItemsContext.Provider