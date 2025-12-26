import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingProvider } from "./contexts/LoadingContext";
import { MonthsProvider } from './contexts/MonthsContext';
import Navbar from './commonComponents/navbar/Navbar';
import LoadingIndicator from './commonComponents/loadingIndicator/LoadingIndicator';
import ScrollPage from './commonComponents/scrollPage/ScrollPage';
import Home from './pages/home/Home';
import Configuration from './pages/configuration/Configuration';

function App() {
	return (
		<LoadingProvider>
			<MonthsProvider>
				<Router>
					<div id="app-layout">
						<Navbar />
						<LoadingIndicator />

						<div id="app-content">
							<Routes>
								<Route path="/" element={<ScrollPage><Home /></ScrollPage>} />
								<Route path="/configuration" element={<Configuration />} />
							</Routes>
						</div>
					</div>
				</Router>
			</MonthsProvider>
		</LoadingProvider>
	);
}

export default App;