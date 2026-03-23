import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [m, setM] = useState(1);
  const [n, setN] = useState(1);
  const [inputM, setInputM] = useState(1);
  const [inputN, setInputN] = useState(1);
  const [activeCells, setActiveCells] = useState(new Set());
  const [clickOrder, setClickOrder] = useState([]);
  const [isPopping, setIsPopping] = useState(false);


  const toggleCell = (index) => {
    const newActive = new Set(activeCells);
    if (newActive.has(index)) {
      newActive.delete(index);
      setClickOrder(clickOrder.filter(i => i !== index));
    } else {
      newActive.add(index);
      setClickOrder([...clickOrder, index]);
    }
    setActiveCells(newActive);
    
    if (newActive.size === m * n) {
      setIsPopping(true);
    }
  };

  const popAllCells = () => {
    if (clickOrder.length === 0) {
      setIsPopping(false);
      return;
    }
    
    setTimeout(() => {
      const newOrder = [...clickOrder];
      const indexToRemove = newOrder.pop();
      
      const newActive = new Set(activeCells);
      newActive.delete(indexToRemove);
      
      setActiveCells(newActive);
      setClickOrder(newOrder);
      
      if (newOrder.length === 0) {
        setIsPopping(false);
      }
    }, 300);
  };

  if (isPopping) {
    popAllCells();
  }

  const inputSize = () => (
    <span>
    <input defaultValue="1" onChange={(e) => setInputM(parseInt(e.target.value))}></input> 
    <input defaultValue="1" onChange={(e) => setInputN(parseInt(e.target.value))}></input> 
    <button onClick={() => { setM(inputM); setN(inputN); }}>Set grid</button>
    </span>
  );

  const cells = Array.from({ length: m * n }, (_, i) => (
    <div
      key={i}
      className={`grid-cell ${activeCells.has(i) ? 'active' : ''}`}
      onClick={() => toggleCell(i)}
    />
  ));

  return (
    <div className="container">
      <h1>{isPopping ? `Popping!` : `${m}x${n} Grid`}</h1>
      <p>Active cells: {activeCells.size}</p>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {cells}
      </div>
      <div className="grid-numbers">
{inputSize()}
      </div>
    </div>
  )
}

export default App
