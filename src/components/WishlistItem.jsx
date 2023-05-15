import { useEffect, useState } from "react";
import "./wishlistItem.scss";
import { useNavigate } from "react-router-dom";


const WishlistItem = ({ item, neuRender, setNeuRender }) => {

	console.log(item)

	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION
	const navigate = useNavigate()

	//Hier die Funktion um das WishlistItem zu löschen
	const handleDelete = async () => {
		try {
			const result = await fetch(url + '/deleteWishlist', {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(item)
			})
			const data = await result.json()
			setNeuRender(true)

		} catch (err) {
			console.log(err)
		}
	}

	const handleNavigateByClick = () => {
		navigate(`/product/${item._id}`)
	}

	useEffect(() => {
		setNeuRender(false)

	}, [neuRender])

	console.log(item._id)

	return (
		<article state={neuRender} className="wishlistItem">
			<img
				onClick={handleNavigateByClick}
				style={{ width: '70px' }} src={item?.image} alt="Artikelname" />
			<article onClick={handleNavigateByClick} >

				<h2>{item?.title}</h2>
				<div>
					<p>Artikeleinheit</p>
					<p>{item?.likes}</p>
				</div>
				<h4>{item?.price}€</h4>
			</article>
			<button onClick={handleDelete}></button>
		</article>
	);
};

export default WishlistItem;
