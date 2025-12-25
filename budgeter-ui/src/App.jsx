import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Navbar from './commonComponents/navbar/Navbar';
import LoadingIndicator from './commonComponents/loadingIndicator/LoadingIndicator';
import ScrollPage from './commonComponents/scrollPage/ScrollPage';
import Home from './pages/home/Home';
import Configuration from './pages/configuration/Configuration';
import { LoadingContext } from "./contexts/LoadingContext";

function App() {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			<Router>
				<div id="app-layout">
					<Navbar />
					<LoadingIndicator show={loading} />

					<div id="app-content">
						<Routes>
							<Route path="/" element={<ScrollPage><Home /></ScrollPage>} />
							<Route path="/configuration" element={<Configuration />} />
						</Routes>
					</div>
				</div>
			</Router>
		</LoadingContext.Provider>
	);
}

export default App;