import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { BottomNav } from './Components/BottomNavigation/BottomNav';
import { NavItem } from './Components/BottomNavigation/NavItem';
import { ReactComponent as TodayIconSvg } from "Images/Icons/today-24px.svg"
import { ReactComponent as ProjectIconSvg } from "Images/Icons/receipt_long-24px.svg"
import { ReactComponent as ProfileIconSvg } from "Images/Icons/account_circle-24px.svg"
import { Today } from "./Components/Today/Today";
import { ItemsProvider, MOCKUP_ITEMS } from "./Common/State/TodoItemsContext";

const App: React.FC = () => {

  return (
    <>
    <BrowserRouter>
      <Switch>
        <ItemsProvider value={MOCKUP_ITEMS}>
          <div className="app-body">
            <Route path="/today">
              <Today/>
            </Route>
          </div>
        </ItemsProvider>
      </Switch>

      <BottomNav>
        <NavItem ripple to="/today">
          <TodayIconSvg /> 
          Gay
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
