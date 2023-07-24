import './App.css'
import {useCount} from './count.tsx'

function App() {
  const { count, upCount } = useCount();

  return (
    <>
      <div className="card">
        <p>count {count}</p>
        <button onClick={upCount}>
          {count % 2 === 0 ? "台北市" : "新竹市"} change place
        </button>
      </div>
    </>
  )
}

export default App;


