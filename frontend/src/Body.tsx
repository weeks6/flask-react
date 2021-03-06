import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { ReactComponent as TodayIconSvg } from "Images/Icons/today-24px.svg"
import { ReactComponent as ProjectIconSvg } from "Images/Icons/receipt_long-24px.svg"
import { ReactComponent as ProfileIconSvg } from "Images/Icons/account_circle-24px.svg"
import { Today } from "./Components/Today/Today";
import { AuthProvider, User } from 'Common/State/AuthContext'
import { ItemsContext, ItemsProvider, useTodos } from "Common/State/TodoItemsContext";
import { Profile } from 'Components/Profile/Profile';
import { GuardedRoute } from 'Common/GuardedRoute/GuardedRoute'
import { SignIn } from 'Components/Auth/SignIn';
import { SignUp } from 'Components/Auth/SignUp'
import { DrawerNavigation } from 'Components/DrawerNavigation/DrawerNavigation';
import { DrawerItem } from 'Components/DrawerNavigation/DrawerItem';
import { refreshAccessToken, userRequset } from 'Common/Auth/ApiRequests'
import { TodoItem } from 'Common/Todo/ItemInterface';
import { TodoRequest } from 'Common/Todo/ApiRequests';

export const Body: React.FC = ({ }) => {

  const [user, setUser] = useState({} as User)
  const todos = useTodos()

  const history = useHistory()

  const fetchUser = async () => {

    const response = await userRequset()
    if (response?.status === 200) setUser(response.data)

    // access token has expired
    else if (response?.status === 401) {

      // try to refresh access token
      const tokenResponse = await refreshAccessToken()
      // refresh token has expired
      if (tokenResponse?.status === 401) history.push('/signin')

      // successfully refreshed token
      // try to get user data again with the new token
      const response = await userRequset()
      setUser(response?.data)
    }
  }

  const fetchTodos = async () => {
    // make ensureTokenAccess() function to run before every such request

    const response = await TodoRequest()

    if (response?.status === 200) todos.setAllTodos(response.data)
    else if (response?.status === 401) {
        const tokenResponse = await refreshAccessToken()
        if (tokenResponse?.status === 401) history.push('/signin')

        // successfully refreshed token
        // try to get user data again with the new token
        const response = await TodoRequest()
        todos.setAllTodos(response?.data)
    }

}

  useEffect(() => {
    const setup = async () => {
      await fetchUser()
      fetchTodos()
    }

    setup()
  }, [])

  return (
    <>
      <DrawerNavigation>
        <DrawerItem ripple to="/today">
          <TodayIconSvg />
          Today
        </DrawerItem>
        <DrawerItem ripple to="/projects">
          <ProjectIconSvg />
          Projects
        </DrawerItem>
        <DrawerItem ripple to="/profile">
          <ProfileIconSvg />
          You
        </DrawerItem>
      </DrawerNavigation>

      <Switch>
        <AuthProvider value={user}>
          <div className="app-body">
            <Route path="/signin">
              <SignIn setUser={setUser} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <ItemsProvider value={todos}>
              <GuardedRoute path="/today">
                <Today />
              </GuardedRoute>
              <GuardedRoute path="/profile">
                <Profile />
              </GuardedRoute>
            </ItemsProvider>
          </div>
        </AuthProvider>
      </Switch>
    </>
  )
}