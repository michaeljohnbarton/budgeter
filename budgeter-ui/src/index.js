import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles.css"; // Only used for React tutorial example

import App from "./App";
// import App from "./oldFiles/AppReactTutorial"
// import App from "./oldFiles/AppApiExample"

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);