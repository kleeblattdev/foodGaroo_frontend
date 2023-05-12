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
import Wishlist from "./pages/Wishlist";
import UserCart from "./pages/UserCart";
import Filter from "./pages/Filter";

import Bouncer from "./bouncer/Bouncer";
import PageNotFound from "./pages/PageNotFound";
import OrderList from "./pages/OrderList";
import Category from "./pages/Category";

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
					<Route element={<Bouncer />}>
						<Route path="/home" element={<Home />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/userCart" element={<UserCart />} />
						<Route path="/wishlist" element={<Wishlist />} />
						<Route path="/orders" element={<OrderList />} />
						<Route path="/category" element={<Category />} />
						<Route path="/filter" element={<Filter />} />
					</Route>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
