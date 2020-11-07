import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { BottomNav } from './Components/BottomNavigation/BottomNav';
import { NavItem } from './Components/BottomNavigation/NavItem';
import { ReactComponent as TodayIconSvg } from "Images/Icons/today-24px.svg"
import { ReactComponent as ProjectIconSvg } from "Images/Icons/receipt_long-24px.svg"
import { ReactComponent as ProfileIconSvg } from "Images/Icons/account_circle-24px.svg"
import { Today } from "./Components/Today/Today";
import { AuthContext, AuthProvider, User } from 'Common/State/AuthContext'
import { Profile } from 'Components/Profile/Profile';
import { GuardedRoute } from 'Common/GuardedRoute/GuardedRoute'
import { SignIn } from 'Components/Auth/SignIn';
import { SignUp } from 'Components/Auth/SignUp'
import { DrawerNavigation } from 'Components/DrawerNavigation/DrawerNavigation';
import { DrawerItem } from 'Components/DrawerNavigation/DrawerItem';

const App: React.FC = () => {

  const [user, setUser] = useState({} as User)

  useEffect(() => {
    const token = localStorage.getItem('jid')
    if (token) {
      const url = `http://${process.env.REACT_APP_BACKEND}/api/auth/user`
      fetch(url, {
        headers: {
          'Authrozation': `bearer ${token}`
        }
      }).then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }, [])

  return (
    <>

    <BrowserRouter>

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
        {/* @TODO change it to actual auth function */}
        <AuthProvider value={user}>
          <div className="app-body">
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/today">
              <Today/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <GuardedRoute path="/profile">
              <Profile/>
            </GuardedRoute>
          </div>
        </AuthProvider>  
      </Switch>

      

      {/* <BottomNav>
        <NavItem ripple to="/today">
          <TodayIconSvg /> 
          Today
        </NavItem>
        <NavItem ripple to="/projects">
          <ProjectIconSvg /> 
          Projects
        </NavItem>
        <NavItem ripple to="/profile">
          <ProfileIconSvg /> 
          You
        </NavItem>
      </BottomNav> */}

    </BrowserRouter>
    </>
  )
}

export default App;
