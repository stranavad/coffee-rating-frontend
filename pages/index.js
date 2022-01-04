import axios from "axios";
import { Typography, Stack } from "@mui/material";
import Coffees from "../components/coffees/Coffees";
import CurrentCoffee from "../components/coffees/CurrentCoffee";
import AddRatingButton from "../components/AddRatingButton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CoffeesContext from "../components/Context/CoffeesContext";

export default function Index({ data }) {
	const [coffees, setCoffees] = useState(data.coffees);
	const [currentCoffee, setCoffee] = useState(data?.coffee);
	const { data: session } = useSession();

	const setCurrent = (coffee) => {
		setCoffee(coffee);

		axios.post("http://localhost:3000/current-coffee", {
			user_id: session.id,
			coffee_id: coffee.id,
		});
	};

	const deleteCoffee = (coffee) => {
		setCoffees((coffees) => coffees.filter((cof) => cof.id !== coffee.id));
		axios.delete("http://localhost:3000/coffees", {
			data: { coffee_id: coffee.id },
		});
	};

	return (
		<CoffeesContext.Provider
			value={{ setCurrent, deleteCoffee, coffees, currentCoffee }}
		>
			<Stack alignItems="left" sx={{ maxWidth: "lg" }}>
				<CurrentCoffee />
				<Typography
					variant="h4"
					component="div"
					sx={{ marginTop: "50px" }}
					color="text.white"
				>
					Dalsi kavicky
				</Typography>
				<Coffees />
				<AddRatingButton />
			</Stack>
		</CoffeesContext.Provider>
	);
}

export const getServerSideProps = async () => {
	const res = await axios.get("http://localhost:3000/coffees");
	const data = await res.data;
	return { props: { data } };
};
