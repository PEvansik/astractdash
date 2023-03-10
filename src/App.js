

// import { useState,  } from 'react';
import Map from './components/map/Map'
import Graph from './components/graphs/Graph'
import './App.css';
import State from './components/state/State';

function App() {


  return (
    <div className="App">
      <div className="mapbody">
        <Graph />
        <Map />
        <State />


      </div>
    </div>
  );
}

export default App;
