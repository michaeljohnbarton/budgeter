import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Configuration from './pages/configuration/Configuration';
import LoadingIndicator from './components/loadingIndicator/LoadingIndicator';
import { LoadingContext } from "./contexts/LoadingContext";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <Router>
        <Navbar /> 
        <LoadingIndicator show={loading} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configuration" element={<Configuration />} />
          </Routes>
        </div>
      </Router>
    </LoadingContext.Provider>
  );
}

export default App;