import React from 'react';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import HeaderBar from './components/header/HeaderBar';
import SideMenu from './components/menu/SideMenu';
import Grid from './components/body-grid/Grid'
import client from './services/apollo/apollo-client'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import thingDetail from './components/thing-detail/ThingDetail';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='main'>
          <div className='header'>
            <HeaderBar/>
          </div>
            <div className='side-menu'>
              <SideMenu/>
          </div>
            <Switch>
              <Route path='/list' component={Grid} className='body'/>
              <Route path='/detail/:thingId' component={thingDetail} className='body'/>
            </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
