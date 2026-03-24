import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [inputRows, setInputRows] = useState(1);
  const [inputCols, setInputCols] = useState(1);
  const [activeCells, setActiveCells] = useState(new Set());
  const [clickOrder, setClickOrder] = useState([]);
  const [isPopping, setIsPopping] = useState(false);

  // Handle popping cells after grid is full
  useEffect(() => {
    if (!isPopping || clickOrder.length === 0) return;

    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [isPopping, clickOrder, activeCells]);

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

    // Trigger popping sequence when grid is full
    if (newActive.size === rows * cols) {
      setIsPopping(true);
    }
  };

  const handleSetGrid = () => {
    setRows(inputRows);
    setCols(inputCols);
    setActiveCells(new Set());
    setClickOrder([]);
    setIsPopping(false);
  };

  const renderGrid = () => {
    return Array.from({ length: rows * cols }, (_, i) => (
      <div
        key={i}
        className={`grid-cell ${activeCells.has(i) ? 'active' : ''}`}
        onClick={() => toggleCell(i)}
      />
    ));
  };

  const renderGridControls = () => (
    <span className="grid-controls">
      <input
        type="number"
        min="1"
        value={inputRows}
        onChange={(e) => setInputRows(parseInt(e.target.value) || 1)}
        placeholder="Rows"
      />
      <span>x</span>
      <input
        type="number"
        min="1"
        value={inputCols}
        onChange={(e) => setInputCols(parseInt(e.target.value) || 1)}
        placeholder="Cols"
      />
      <button onClick={handleSetGrid}>Set Grid</button>
    </span>
  );

  return (
    <div className="container">
      <h1>{isPopping ? 'Popping!' : `${rows}x${cols} Grid`}</h1>
      <p>Active cells: {activeCells.size}</p>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {renderGrid()}
      </div>
      <div className="grid-controls-wrapper">
        {renderGridControls()}
      </div>
    </div>
  );
}

export default App
