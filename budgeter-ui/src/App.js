import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Configuration from './pages/configuration/Configuration';

function App() {
  return (
    <Router>
      <Navbar /> 
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
