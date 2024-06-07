import React, { useState } from "react";

const Practice = () => {
	const [items, setItems] = useState(0);
	const [lines, setLines] = useState([[10, 5, 2], [], [], [], []]);

	const addItemsToLine = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let lineWithLeast = null;
		let leastItemsAmount = 1e9;
		for (let line of lines) {
			const totalInLine = line.reduce((sum, value) => sum + value);
			console.log(totalInLine);
			if (totalInLine <  leastItemsAmount) {
				lineWithLeast = line;	
			}
		}

		// loop through all lines,
		// find the line with LEAST items
		// push the items
	};
	return (
		// <div>
		// 	<select value={selectedCountryId} onChange={handleCountryChange}>
		// 		<option value="">Select a country</option>
		// 		{countries.map((country) => (
		// 			<option key={country.id} value={country.id}>
		// 				{country.name}
		// 			</option>
		// 		))}
		// 	</select>

		// 	<select disabled={!selectedCountryId}>
		// 		<option value="">Select a city</option>
		// 		{selectedCountry &&
		// 			selectedCountry.cities.map((city, index) => (
		// 				<option key={index} value={city}>
		// 					{city}
		// 				</option>
		// 			))}
		// 	</select>
		// </div>
		<>
			<form>
				<input
					required
					type="number"
					value={items}
					onChange={(e) => setItems(e.currentTarget.valueAsNumber)}
				></input>
				<button> Checkout </button>
			</form>
			{lines.map((people, index) => (
				<div key={index} className="lines">
					X
				</div>
			))}
		</>
	);
};

export default Practice;
