import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { BottomNav } from './Components/BottomNavigation/BottomNav';
import { NavItem } from './Components/BottomNavigation/NavItem';
import { ReactComponent as TodayIconSvg } from "Images/Icons/today-24px.svg"
import { ReactComponent as ProjectIconSvg } from "Images/Icons/receipt_long-24px.svg"
import { ReactComponent as ProfileIconSvg } from "Images/Icons/account_circle-24px.svg"
import { Today } from "./Components/Today/Today";
import { AuthContext, AuthProvider } from 'Common/State/AuthContext'
import { Profile } from 'Components/Profile/Profile';
import { GuardedRoute } from 'Common/GuardedRoute/GuardedRoute'
import { SignIn } from 'Components/Auth/SignIn';

const App: React.FC = () => {

  return (
    <>
    <BrowserRouter>
      <Switch>
        {/* @TODO change it to actual auth function */}
        <AuthProvider value={false}>
          <div className="app-body">
            <Route path="/signin">
              <SignIn/>
            </Route>
            <Route path="/today">
              <Today/>
            </Route>
            <GuardedRoute path="/profile">
              <Profile/>
            </GuardedRoute>
          </div>
        </AuthProvider>  
      </Switch>

      <BottomNav>
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
      </BottomNav>

    </BrowserRouter>
    </>
  )
}

export default App;
