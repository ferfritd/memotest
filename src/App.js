import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route, 
  Switch} from 'react-router-dom';

import DeckContextProvider from './shared/Context/DeckContextProvider'


import Header from './shared/Navigation/Header';
import NewGame from './game/pages/NewGame';
import Game from './game/pages/Game';
import MyGames from './game/pages/MyGames'
import EditGame from './game/pages/EditGame'



import './index.css';


function App() {
  return (
    <div className="App">
      <DeckContextProvider>
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact>
              <Game />
            </Route>
            <Route path="/about" exact>
              <h1>Somos nosotros</h1>
            </Route>
            <Route path="/game" exact>
              <NewGame/>
            </Route>
            <Route path="/my-games" exact>
              <MyGames/>
            </Route>
           <Route path="/my-games/:deckId">
              <EditGame/>
           </Route>
            <Redirect to='/'/>
          </Switch>
        </Router>  
      </DeckContextProvider>
     </div>
  );
}

export default App;
