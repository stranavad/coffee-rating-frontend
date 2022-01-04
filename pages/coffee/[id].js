import axios from "axios";
import { useState } from 'react';
import Coffee from "../../components/coffees/Coffee";
import CoffeesContext from '../../components/Context/CoffeesContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const coffee = ({ coffeeProps, currentCoffeeIdProps }) => {
	const [coffee, setCoffee] = useState(coffeeProps);
	const [currentCoffeeId, setCurrentCoffeeId] = useState(currentCoffeeIdProps);
	const { data: session } = useSession();
	const router = useRouter();

	const setCurrent = (coffee) => {
		setCurrentCoffeeId(coffee.id);
		axios.post("http://localhost:3000/current-coffee", {
			user_id: session.id,
			coffee_id: coffee.id,
		});
	};

	const deleteCoffee = (coffee) => {
		axios.delete("http://localhost:3000/coffees", {
			data: { coffee_id: coffee.id },
		}).then(() => router.push('/'));
	}

	return (
		<CoffeesContext.Provider value={{coffee, currentCoffee: {id: currentCoffeeId}, setCurrent, deleteCoffee}}>
			<Coffee coffee={coffee}/>
		</CoffeesContext.Provider>
	);
};

export default coffee;

export const getServerSideProps = async (ctx) => {
	const res = await axios.get(`http://localhost:3000/coffees/coffee`, {
		params: { id: ctx.params.id },
	});
	//const res = await axios.get(`http://localhost:3000/coffee/${ctx.params.id}`);
	const { coffee, currentCoffeeId } = await res.data;
	return { props: { coffeeProps: coffee, currentCoffeeIdProps: currentCoffeeId } };
};
