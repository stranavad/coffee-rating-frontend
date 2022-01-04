import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
	Stack,
	Box,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import { useSession } from "next-auth/react";

const createCoffee = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [image, setImage] = useState("");
	const [rating, setRating] = useState(false);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/coffees", {
				name,
				description,
				url,
				image,
			})
			.then(() => {
				console.log("coffee posted");
				if (rating) {
					axios
						.get("http://localhost:3000/coffees/ids-names")
						.then((res) => {
							router.push(
								`/add-rating/${res.data.coffees[name]}`
							);
						});
				} else {
					router.push("/");
				}
			});
	};
	if (status === "loading") {
		return (
			<Stack sx={{ maxWidth: "lg" }} alignItems="center">
				<Typography variant="h3">Loading</Typography>
			</Stack>
		);
	}
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
				<Stack component="form" pt={2} spacing={2} onSubmit={onSubmit}>
					<Typography variant="h4" component="h1">
						Create coffee
					</Typography>
					<TextField
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
						placeholder="Coffee name"
					/>
					<TextField
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="outlined"
						placeholder="Coffee description"
					/>
					<TextField
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						variant="outlined"
						placeholder="Coffee url"
					/>
					<TextField
						value={image}
						onChange={(e) => setImage(e.target.value)}
						variant="outlined"
						placeholder="Coffee Image"
					/>
					<FormGroup>
						<FormControlLabel
							label="Also add rating: "
							control={
								<Checkbox
									checked={rating}
									onChange={() => setRating((prev) => !prev)}
								/>
							}
							sx={{
								display: "flex",
								flexDirection: "row-reverse",
							}}
						/>
					</FormGroup>
					<Button type="submit" variant="contained">
						Create
					</Button>
					<Button
						variant="contained"
						size="small"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default createCoffee;
