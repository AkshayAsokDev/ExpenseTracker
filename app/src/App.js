import { useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import ReactModal from 'react-modal';



function App() {


  useEffect(() => {
    ReactModal.setAppElement("#App");
  }, [])

  return (
    <div id="App">
      <Home />
    </div>
  );
}

export default App;
