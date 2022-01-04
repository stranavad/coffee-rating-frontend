import { SessionProvider } from "next-auth/react";
import Menu from '../components/Menu';
import { Stack, Box } from '@mui/material';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
	return (
		<SessionProvider session={session}>
			<Box sx={{maxWidth: '100vw', overflowX: "hidden"}}>
				<Menu />
				<Stack
					alignItems="center"
					sx={{ width: "100vw", maxWidth: "100vw", paddingTop: 2 }}
				>
					<Component {...pageProps} />
				</Stack>
			</Box>
		</SessionProvider>
	);
}

export default MyApp;
