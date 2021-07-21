import './App.css';
import useCompData from './compData/useCompData';
import { useEffect } from 'react';

function App() {
  const { setData, compData } = useCompData('Home');
  const {
    setData: setAnotherData,
    compData: anotherCompData
  } = useCompData('Another', {banana: 'yes'});

  useEffect(() => {
    if (compData.name === undefined) {
      setData({ name: 'Bobby' });
    }
  }, [setData, compData.name]);

  const handleInput = ({target}) => {
    setData({name: target.value});
  }
  return (
    <div className="App">
      <h1>{`Hi ${compData.name}`}</h1>
      <input type="text" onChange={handleInput}/>
      <h2>{`Banana? ${anotherCompData.banana}`}</h2>
      <button onClick={() => setAnotherData({banana: 'no'})}>Change</button>
    </div>
  );
}

export default App;
