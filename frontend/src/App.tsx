import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'

import { Body } from 'Body';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </>
  )
}

export default App;
