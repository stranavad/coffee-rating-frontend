import { useState, useEffect } from "react";
//import AddRating from '../../components/AddRating';
import axios from "axios";
import { useRouter } from "next/router";
import {
	Stack,
	Typography,
	TextField,
	Button,
	Box,
	Slider,
} from "@mui/material";

import { useSession } from "next-auth/react";

const addRating = ({ coffee, indexes }) => {
	const [slider, setSlider] = useState(50);
	const [notes, setNotes] = useState("");
	const { data: session, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (session) {
			const ratingObject = coffee.ratings[indexes[session.id]]
				? coffee.ratings[indexes[session.id]]
				: false;
			const userExists = session.id in indexes;
			setSlider(userExists && ratingObject ? ratingObject.rating : 0);
			setNotes(userExists && ratingObject ? ratingObject.notes : "");
		}
	}, [session]);
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/ratings", {
				user_id: session.id,
				coffee_id: coffee.id,
				notes,
				rating: slider,
			})
			.then(() => router.push("/"));
	};

	return (
		<Stack sx={{ maxWidth: "lg" }} alignItems="center">
			<Box
				sx={{
					width: 400,
					backgroundColor: "primary.light",
					padding: 4,
					borderRadius: 1,
				}}
			>
				<Stack
					pt={2}
					spacing={2}
					component="form"
					onSubmit={onSubmit}
				>
					<Typography
						component="h2"
						variant="h4"
						color="text.white"
						sx={{ marginBottom: 4 }}
					>
						Add Rating for <br />"{coffee.name}"
					</Typography>
					<Typography component="h6" variant="h4" color="text.white">
						{slider}
					</Typography>
					<Slider
						defaultValue={80}
						aria-label="Default"
						valueLabelDisplay="auto"
						value={slider}
						onChange={(e) => setSlider(e.target.value)}
					/>
					<TextField
						id="notes"
						name="notes"
						label="Notes"
						variant="outlined"
						value={notes}
						autoFocus
						onChange={(e) => setNotes(e.target.value)}
					/>

					<Button
						variant="contained"
						type="submit"
						sx={{ marginBottom: 2 }}
					>
						Add Rating
					</Button>
					<Button
						variant="contained"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default addRating;

export const getServerSideProps = async (ctx) => {
	const res = await axios.get(`http://localhost:3000/coffees/coffee`, {
		params: { id: ctx.params.id },
	});
	const data = await res.data;
	return { props: { coffee: data.coffee, indexes: data.indexes } };
};
