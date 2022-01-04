import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddRatingButton() {
	return (
		<Box sx={{ position: "fixed", right: 50, bottom: 50 }}>
			<Link href="/create-coffee">
				<Fab color="primary" aria-label="create">
					<AddIcon />
				</Fab>
			</Link>
		</Box>
	);
}

export default AddRatingButton;
