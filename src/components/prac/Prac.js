


import { useState, useRef } from 'react';
// import Map from './components/map/Map'
// import Prac from './components/prac/Prac'
import './App.css';

function App() {
  const [inpa, setInpa] = useState(
    {
      num: 0,
      tes: ''
    }
  )

  const inOne = useRef()
  const inTwo = useRef()

  const getNumBox = () => {
    console.log('Num')
    console.log(inOne.current.name)
  }
  const getTextBox = () => {
    console.log('text')
    console.log(inTwo.current)
    inTwo.current.style.border = '2px solid blue'
  }
  const handleInput = (e) => {
    const {name, type, value} = e.target;
    setInpa(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className="App">
      <div className="mapbody">
        <h1>Priceweless</h1>

        <input  
          style={{border: '1px solid red', marginInline: '20px'}}  
          ref={inOne}
          name='num'
          type="number"
          onInput={handleInput}
          value={inpa.num} />

        <input   
          style={{border: '1px solid red'}} 
          ref={inTwo}
          name='tes'
          type="text"
          onInput={handleInput}
          value={inpa.tes} />

          <h2>{inpa.tes}</h2>

          <button 
            onClick={() => getNumBox()}
            style={{border: '1px solid red', marginInline: '20px'}}  
            >Pands</button>
          <button 
            onClick={() => getTextBox()}
            style={{border: '1px solid red', marginInline: '20px'}}  >Dolaz</button>

        </div>
        </div>)
        
}