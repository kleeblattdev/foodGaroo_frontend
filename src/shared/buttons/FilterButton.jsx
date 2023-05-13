import React from 'react';
import "./FilterButton.scss";
import { useState } from 'react';



const FilterButton = (({ children, link, item, onClick, aktivButtonCategory, aktivButtonBadges }) => {


	return (
		// wenn der button gedrückt ist, dann soll er in aktivButtonCategory gespeichert werden und die farbe soll grün sein
		<button className='filterButton' onClick={() => onClick(item)} /* onClick bei button aufrufen */
			/* stylen anhand der aktiveButtonCategory von vorne */
			/* 			style={(aktivButtonCategory?.includes(item.aisle)) ? { backgroundColor: 'green' } : { backgroundColor: '' }
							(aktivButtonBadges?.includes(item.aisle)) ? { backgroundColor: 'green' } : { backgroundColor: '' }}
						 */
			style={{
				backgroundColor:  (aktivButtonCategory?.includes(item.aisle)) ? 'green' : (aktivButtonBadges?.includes(item.type)) ? 'green' : ''
				
			}}
		>
			{children} {/* {item.type} {item.aisle} */}
		</button>
	);
})

export default FilterButton;
