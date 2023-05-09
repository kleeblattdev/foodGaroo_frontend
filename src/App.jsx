//library import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//pages import
import OnBoarding from "./pages/OnBoarding";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<OnBoarding />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
