import React, { useEffect, useState } from "react";
import ItemsCard from "../../components/items/ItemsCard";
import MealsForm from "./MealsForm";
import { Link } from "react-router-dom";
import axios from "axios";

function ItemsDrinks() {
	const [items, setItem] = useState([]);
	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		axios
			.get(`${API_URL}/getiteDrinks`,{withCredentials:true})
			.then((res) => {
				console.log(res.data.items); // Log the employees array from the response
				setItem(res.data.items);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="flex flex-wrap items-center justify-start gap-8 mt-16 ml-12 mr-12 lg:ml-10 xl:ml-12 lg:mr-8 xl:mr-4">
			<div className="">
				<Link to="/app/items/add/:Drinks" state={{ category: "Drinks" }}>
					<button className="flex flex-col items-center justify-center h-[337px] w-[237px] bg-[rgb(0,127,168,0.15)] border-2 rounded-lg border-dashed border-[#027297] hover:bg-[rgb(0,127,168,0.25)]">
						<div className="flex items-center justify-center h-12 w-12 bg-[#007FA8] opacity-75 rounded-full">
							<span className="text-2xl font-bold text-white">+</span>
						</div>
						<p className="mt-2 text-gray-600">Add New Item</p>
					</button>
				</Link>
			</div>
			{/* <div><ItemsCard /></div>
        <div><ItemsCard /></div>
        <div><ItemsCard /></div>
        <div><ItemsCard /></div>
        <div><ItemsCard /></div>
        <div><ItemsCard /></div> */}
			{/* Employee Cards */}
			{items.map((item, index) => (
				<ItemsCard key={index} data={item} />
			))}
		</div>
	);
}

export default ItemsDrinks;
