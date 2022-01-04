import { useSession, signIn, signOut } from "next-auth/react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

function Menu() {
	const { data: session, status } = useSession();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Coffee rating
					</Typography>
					{session ? (
						<>
							{status === "authenticated" ? (
								<Button onClick={signOut} color="inherit">
									SignOut
								</Button>
							) : (
								<Button onClick={signIn} color="inherit">
									SignIn
								</Button>
							)}
						</>
					) : (
						<Button onClick={signIn} color="inherit">
							SignIn
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Menu;
