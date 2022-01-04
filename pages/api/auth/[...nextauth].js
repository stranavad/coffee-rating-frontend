import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		session: async ({ session, token }) => {
			session.id = token.sub;
			return Promise.resolve(session);
		},
		signIn: async ({ user }) => {
			//make request to backend
			axios
				.post(`http://localhost:3000/user`, {
					user_id: user.id,
					username: user.name,
				})
				.then((res) => console.log(res.data.message));
			return true;
		},
	},
});
