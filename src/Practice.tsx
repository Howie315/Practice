import React, { useState } from "react";

const countries = [
	{
		id: "1",
		name: "United States",
		cities: ["San Francisco", "San Diego", "New York", "Los Angeles"],
	},
	{
		id: "2",
		name: "Canada",
		cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
	},
	{
		id: "3",
		name: "United Kingdom",
		cities: ["London", "Manchester", "Birmingham", "Liverpool"],
	},
	{
		id: "4",
		name: "Australia",
		cities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
	},
	{
		id: "5",
		name: "Germany",
		cities: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
	},
];

const Practice = () => {
	const [selectedCountryId, setSelectedCountryId] = useState("");

	const handleCountryChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSelectedCountryId(event.target.value);
	};

	const selectedCountry = countries.find(
		(country) => country.id === selectedCountryId,
	);

	return (
		<div>
			<select value={selectedCountryId} onChange={handleCountryChange}>
				<option value="">Select a country</option>
				{countries.map((country) => (
					<option key={country.id} value={country.id}>
						{country.name}
					</option>
				))}
			</select>

			<select disabled={!selectedCountryId}>
				<option value="">Select a city</option>
				{selectedCountry &&
					selectedCountry.cities.map((city, index) => (
						<option key={index} value={city}>
							{city}
						</option>
					))}
			</select>
		</div>
	);
};

export default Practice;
