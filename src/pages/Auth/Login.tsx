import React, { useState } from "react";
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
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  var formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  const handleSubmit = async(e: any) => {
    console.log(email, password, remember);
    await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/user/login',
      data: formdata,
      withCredentials: true,
      headers: {"Content-Type": "multipart/form-data"}
    }).then((props: any) => {
      console.log(props);
      window.location.href="/";
    }).catch((err: Error) => {
      console.log(err);
    });
  };

  return (
    <div>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Account Login
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            href="#"
            size="sm"
            onClick={(event: any) => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox
              label="Remember me"
              onClick={(e: any) => setRemember(!remember)}
            />
            <Anchor
              onClick={(event: any) => event.preventDefault()}
              href="#"
              size="sm"
              onClickCapture={() => {
                window.location.href = "/reset_password";
              }}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleSubmit}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
