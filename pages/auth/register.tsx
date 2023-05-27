import React from "react";
import {
	Box,
	TextInput,
	PasswordInput,
	Center,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
	Progress,
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconCheck, IconX } from "@tabler/icons-react";
import { baseURL } from "@/pages/_app";
import IsUser from "@/utils/IsUser";

const requirements = [
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

const PasswordRequirement = ({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) => (
	<Text color={meets ? "teal" : "red"} mt={5} size="sm">
		<Center inline>
			{meets ? (
				<IconCheck size="1rem" stroke={1.5} />
			) : (
				<IconX size="1rem" stroke={1.5} />
			)}
			<Box ml={7}>{label}</Box>
		</Center>
	</Text>
);

const getStrength = (value: string): number => {
	let multiplier = value.length > 8 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(value)) {
			multiplier += 1;
		}
	});

	return 100 - (100 / (requirements.length + 1)) * multiplier;
};

const Register = () => {
	const router = useRouter();
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [pass, setPass] = React.useState("");
	const [confirmPass, setConfirmPass] = React.useState("");
	const [check, setCheck] = React.useState(false);
	const strength = getStrength(pass);

	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(pass)}
		/>
	));

	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ bar: { transitionDuration: "2ms" } }}
				value={
					pass.length > 0 && index === 0
						? 100
						: strength >= ((index + 1) / 4) * 100
						? 100
						: 0
				}
				color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
				key={index}
				size={4}
			/>
		));

	const redirect = async () => {
		router.push("/auth/login");
	};

	const handleSubmit = async () => {
		const form = new FormData();
		form.append("name", name);
		form.append("email", email);
		form.append("password", confirmPass);

		const requestOptions: RequestInit = {
			method: "POST",
			body: form,
			redirect: "follow",
			credentials: "include",
		};

		fetch(`${baseURL}/auth/register`, requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};

	return (
		<IsUser>
			<div>
				<Container size={420} my={40}>
					<Title align="center">Create an account!</Title>
					<Text color="dimmed" size="sm" align="center" mt={5}>
						Already have an account?{" "}
						<Anchor
							size="sm"
							component="button"
							type="button"
							onClick={redirect}
						>
							Sign in
						</Anchor>
					</Text>

					<Paper withBorder shadow="md" p={30} mt={30} radius="md">
						<TextInput
							label="Name"
							placeholder="Your Name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextInput
							label="Email"
							placeholder="youremail@domain.com"
							required
							mt="md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<PasswordInput
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							placeholder="Your password"
							label="Password"
							required
							mt="md"
						/>
						<PasswordInput
							label="Confirm Password"
							placeholder="Confirm your password"
							required
							mt="md"
							value={confirmPass}
							onChange={(e) => {
								setConfirmPass(e.target.value);
								e.target.value === pass && strength > 80
									? setCheck(true)
									: setCheck(false);
							}}
						/>

						<Group spacing={5} grow mt="md" mb="md">
							{bars}
						</Group>

						<PasswordRequirement
							meets={pass.length > 7}
							label="Minimum 8 characters"
						/>
						{checks}

						<Button fullWidth mt="xl" disabled={!check} onClick={handleSubmit}>
							Register
						</Button>
					</Paper>
				</Container>
			</div>
		</IsUser>
	);
};

export default Register;
