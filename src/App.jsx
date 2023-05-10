//library import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

//pages import
import OnBoarding from "./pages/OnBoarding";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RegisterSuccess from "./pages/RegisterSuccess";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<OnBoarding />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/successRegistration" element={<RegisterSuccess />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
