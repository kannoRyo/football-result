import React from 'react';
import './assets/css/App.css';
import './assets/css/style.css'
import { Header, GameResults, Spacer } from './components/index'

function App() {
  return (
    <div className="c-section"> 
      <div className="c-box bg-gray-100">
        <Header />
        <Spacer
          size={"medium"}
        />
        <GameResults />
      </div>
    </div>
  );
}

export default App;
