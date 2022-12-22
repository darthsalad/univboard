import React, { useState } from "react";
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useStyles } from "./auth.styles";
import axios from "axios";

export function Forgot() {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  
  const formData = new FormData();
  formData.append("email", email);

  const handleSubmit = async() => {
    await axios({
      method: "POST",
      url: "http://localhost:5000/api/user/forgot_password",
      headers: {"Content-Type":"multipart/form-data"},
      data: formData,
      withCredentials: true
    }).then(function (res) {
      console.log(res.data);
      setVisible(true);
    }).catch(function (error) {
      console.error(error);
    });
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="me@mantine.dev"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor
            color="dimmed"
            size="sm"
            className={classes.control}
            onClick={() => (window.location.href = "/login")}
          >
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to login page</Box>
            </Center>
          </Anchor>
          <Button onClick={handleSubmit} className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
        {visible ?
          <Container className={classes.wrapper}>
            <Title className={classes.title2}>Reset password mail successfully sent!</Title>
      
            <Container size={560} p={0}>
              <Text size="sm" className={classes.description}>
                Please check your mail for the link to change the password of your account
              </Text>
            </Container>
          </Container>
        : null}
    </Container>
  );
}

export default Forgot;
