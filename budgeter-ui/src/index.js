import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

import App from "./App";
// import App from "./oldFiles/AppReactTutorial"
// import App from "./oldFiles/AppApiExample"

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);