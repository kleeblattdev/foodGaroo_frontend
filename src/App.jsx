//library import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

//pages import
import OnBoarding from "./pages/OnBoarding";
import Register from "./pages/Register";
import Login from "./pages/Login";

import RegisterSuccess from "./pages/RegisterSuccess";

import Home from "./pages/Home";
import Welcome from "./components/Welcome";
import FailedLogin from "./pages/FailedLogin";
import Profile from "./pages/Profile";

import Bouncer from "./bouncer/Bouncer";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<OnBoarding />} />
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/failedLogin" element={<FailedLogin />} />
					<Route path="/successRegistration" element={<RegisterSuccess />} />
					<Route element={<Bouncer/>}>
						<Route path="/home" element={<Home />} />
						<Route path="/profile" element={<Profile />}></Route>
					</Route>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
