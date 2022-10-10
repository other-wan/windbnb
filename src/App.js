import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import {StayContext} from "./contexts/StayContext";

function App() {
  const [stays, setStays] = useState([]);
  
  useEffect(() => {
    fetch("/stays.json")
      .then(apiRes => apiRes.json())
      .then(apiData => {
        window.localStorage.setItem("STAYS", JSON.stringify(apiData));
        setStays(apiData);
      });
  }, [])

  return (
    <StayContext.Provider className="App" value={{stays, setStays}}>
      <Header />
      <Main />
    </StayContext.Provider>
  );
}

export default App;
