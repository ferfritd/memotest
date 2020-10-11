import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route, 
  Switch} from 'react-router-dom';

import Header from './shared/Navigation/Header';
import NewGame from './game/pages/NewGame';


import './index.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact>
            <div className="temporalDiv">
            <h1>Nothing here yet. <span>But soon...</span></h1>
            </div>

          </Route>
          <Route path="/about" exact>
            <h1>Somos nosotros</h1>
          </Route>
          <Route path="/game" exact>
            <NewGame/>
          </Route>
          <Redirect to='/'/>
        </Switch>
      </Router>
     </div>
  );
}

export default App;
