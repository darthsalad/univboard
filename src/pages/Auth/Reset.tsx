import React, { useContext, useState } from "react";
import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text
} from "@mantine/core";
import axios from "axios";
import { useStyles } from "./auth.styles";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { classes } = useStyles();
  let { resetToken } = useParams();
  const auth = useContext(AuthContext);

  var formdata = new FormData();
  formdata.append("password", password);

  const checkPass = () => {
    return password === confirmPassword ? true : false;
  };

  const handleSubmit = async() => {
    console.log(password, confirmPassword, resetToken);
    await axios({
        method: "POST",
        url: `http://localhost:5000/api/user/new_password/${resetToken}`,
        headers: {"Content-Type":"multipart/form-data"},
        data: formdata,
        withCredentials: true
    }).then((res) => {
      console.log(res);
      setVisible(true);
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div>
      {auth ? window.location.href="/"
      : <Container size={420} my={40}>
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
          {visible ?
          <Container className={classes.wrapper}>
            <Title className={classes.title2}>Password Changed!</Title>
      
            <Container size={560} p={0}>
              <Text size="sm" className={classes.description}>
                Password changed successfully, login <a href="/login">here</a>
              </Text>
            </Container>
          </Container>
        : null}
      </Container>
      }
    </div>
  );
};

export default Reset;
