import React, { useState } from "react";
import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useStyles } from "./auth.styles";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { classes } = useStyles();

  var formdata = new FormData();
  formdata.append("password", password);

  const checkPass = () => {
    return password === confirmPassword ? true : false;
  };

  const handleSubmit = () => {
    console.log(password, confirmPassword);
    // await axios({
    //     method: "POST"
    // })
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
          Set a new password
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <PasswordInput
            label="Password"
            placeholder="you@mantine.dev"
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Your password"
            classNames={{ input: checkPass() ? "" : classes.invalid }}
            required
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            mt="md"
          />
          <Button
            disabled={!checkPass()}
            fullWidth
            mt="xl"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Reset;
