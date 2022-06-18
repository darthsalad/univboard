import React from "react"
import { 
    FormControl,
    InputLabel,
    OutlinedInput,
    ThemeProvider,
    createTheme,
    IconButton,
    InputAdornment,
    Stack,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { NavLink } from "react-router-dom"

const SignUp = () => {
    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
        seePassword: false
    });

    const handleChange = (prop) => (e) => {
        setValues({...values, [prop]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          seePassword: !values.seePassword,
        });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    return (
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            minHeight: "100vh",
            minWidth: '100vw',
            width: 'auto',
            backgroundImage: "linear-gradient(to bottom right, #00C0FF, #4218B8)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'auto 10%'
          }}
        >
          <Card
            sx={{
              maxWidth: "600px",
              minWidth: "400px",
              textAlign: "center",
              borderRadius: '20px',
              margin: '10%',
              padding: '50px'
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                SignUp
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Register for a new account
              </Typography>
              <Stack spacing={2}>
                <FormControl style={{ margin: "20px" }}>
                  <InputLabel htmlFor="SignUp-name">Name</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={values.name}
                    onChange={handleChange("name")}
                    label="Name"
                  />
                </FormControl>
                <FormControl style={{ margin: "20px"}}>
                  <InputLabel htmlFor="SignUp-email">Email</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={values.email}
                    onChange={handleChange("email")}
                    label="Email"
                  />
                </FormControl>
                <FormControl style={{ margin: "20px" }}>
                  <InputLabel htmlFor="SignUp-password">Password</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    type={values.seePassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    label="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.seePassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Stack>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: '50px'
                }}
              >
                <Button variant="outlined"><div style={{fontSize: '1.2rem'}}>SignUp</div></Button>
              </CardActions>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Already have an account? 
                  <NavLink style={{textDecoration: 'none', color: '#00C0FF'}} to='/login'> Login </NavLink>
                </Typography>
            </CardContent>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
}

export default SignUp;