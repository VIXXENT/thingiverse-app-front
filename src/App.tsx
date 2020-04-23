import React from 'react';
import './App.css';
import HeaderBar from './components/header/HeaderBar';
import SideMenu from './components/menu/SideMenu';
import Grid from './components/body-grid/Grid'

function App() {
  return (
    <div className='main'>
      <div className='header'>
        <HeaderBar/>
      </div>
        <div className='side-menu'>
          <SideMenu/>
      </div>
        <div className='body'>
          <Grid/>
      </div>
    </div>
  );
}

export default App;
