import { useState, useEffect } from "react";
import Header from "../shared/Header";
import Navigation from "../shared/Navigation";

const UserCart = () => {
	const [cart, setCart] = useState(null)
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;

	useEffect(()=>{
		const getCart = async () =>{
			const response = await fetch(url + "/cart", {
				method: "get",
				credentials: "include",
				headers: { "content-type": "application/json" },
			});
			const data = await response.json()
			console.log(data);
			setCart(data)
		}
		getCart()
	},[])

	return (
		<main className="userCart">
			<Header>My Cart</Header>
			{
				cart && cart.items.map(item =>{
					return <div className="product">
						<h3>{item.title}</h3>
						<p>{item.price}</p>
					</div>
				})
			}
			
			<Navigation />
		</main>
	);
};

export default UserCart;
