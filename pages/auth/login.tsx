import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { baseURL } from "@/pages/_app";
import useNotifications from "@/utils/useNotifications";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = React.useState("piyushmishra965@gmail.com");
	const [pass, setPass] = React.useState("123456789");

	const redirect = async () => {
		router.push("/auth/register");
	};

	const handleSubmit = async () => {
		const form = new FormData();
		form.append("email", email);
		form.append("password", pass);

		const requestOptions: RequestInit = {
			method: "POST",
			body: form,
			redirect: "follow",
			credentials: "include",
		};

		fetch(`${baseURL}/auth/login`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.token || result.user) {
					localStorage.setItem("token", result.token);
					useNotifications({
						title: "Login Successful",
						message: "You have been logged in successfully",
						color: "lime",
					});
					window.location.href = "/";
				}
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({
					fontWeight: 900,
				})}
			>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{" "}
				<Anchor size="sm" component="button" type="button" onClick={redirect}>
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					value={email}
					label="Email"
					placeholder="youremail@domain.com"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					value={pass}
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					onChange={(e) => setPass(e.target.value)}
				/>
				<Group position="apart" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm">
						Forgot password?
					</Anchor>
				</Group>
				<Button fullWidth mt="xl" onClick={handleSubmit}>
					Sign in
				</Button>
			</Paper>
		</Container>
	);
};

export default Login;
