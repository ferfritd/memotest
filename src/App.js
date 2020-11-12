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
          <main>
            <Switch>
              <Route path="/" exact>
                <Game title="Kioku - My Game"/>
              </Route>
              <Route path="/game" exact>
                <NewGame title="Kioku - New Game"/>
              </Route>
              <Route path="/my-games" exact>
                <MyGames title="Kioku - My Games"/>
              </Route>
            <Route path="/my-games/:deckId">
                <EditGame title="Kioku - Edit Game"/>
            </Route>
              <Redirect to='/'/>
            </Switch>
          </main>
        </Router>  
      </DeckContextProvider>
     </div>
  );
}

export default App;
