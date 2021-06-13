import React, { createContext } from 'react';
import './App.css';
// import { LinkInput } from './components/LinkInput'
import * as dotenv from "dotenv";
import { LinkInput } from './components/LinkInput';

dotenv.config();

export const YoutubeMoviesContext = createContext([]);

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <p>Your favourite YouTube movies</p>
      </header>
      <LinkInput />

      <div>
      </div>
    </div>
  );
}

export default App;
