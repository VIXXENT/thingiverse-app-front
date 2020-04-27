import React, { useState } from 'react';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import HeaderBar from './components/header/HeaderBar';
import SideMenu from './components/menu/SideMenu';
import Grid from './components/body-grid/Grid'
import client from './services/apollo/apollo-client'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ThingDetail from './components/thing-detail/ThingDetail';


function App() {
  const [userId, setUserId] = useState<number>();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='main'>
          <div className='header'>
            <HeaderBar userId={userId} setUserId={setUserId}/>
            {console.log("userId", userId)}
          </div>
            <div className='side-menu'>
              <SideMenu/>
          </div>
            <Switch>
              {console.log("APP - userId: ", userId)}
              <Route path='/list'
                render={(props)=>
                <Grid
                    {...props}
                    userId={userId}
                    setUserId={setUserId}
                  />
                }
              />
              <Route path='/detail/:thingId'
                render={(props)=>
                  <ThingDetail
                    {...props}
                    userId={userId}
                    setUserId={setUserId}
                  />
                }
              />
            </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
