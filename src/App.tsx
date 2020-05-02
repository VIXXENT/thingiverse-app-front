import React, { useState } from 'react';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import HeaderBar from './components/header/HeaderBar';
import SideMenu from './components/menu/SideMenu';
import Grid from './components/body-grid/Grid'
import client from './services/apollo/apollo-client'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ThingDetail from './components/thing-detail/ThingDetail';


function App(): JSX.Element {
  const [userId, setUserId] = useState<number>();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='main'>
          <div className='header'>
            <HeaderBar userId={userId} setUserId={setUserId}/>
          </div>
            <div className='side-menu'>
              <SideMenu/>
          </div>
            <Switch>
              <Route path='/list'
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                render={(props)=>
                <Grid
                    {...props}
                    userId={userId}
                    setUserId={setUserId}
                  />
                }
              />
              <Route path='/detail/:thingId'
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
