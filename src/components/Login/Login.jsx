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
import axios from "axios"
import { AuthContext } from "../../AuthContext"
import { useContext } from "react"

const Login = () => {
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        seePassword: false,
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

    const auth = useContext(AuthContext);

    const darkTheme = createTheme({
      palette: {
          mode: 'dark',
        },
      });
      
    var formdata = new FormData();
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    
    async function handleSubmit() {
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/user/login',
        data: formdata,
        withCredentials: true,
        headers: {"Content-Type": "multipart/form-data"}
      }).then((props) => {
        console.log(props);
        window.location="/"
      }).catch((err) => {
        console.log(err);
      });
    }

    return (
      auth 
      ? window.location="/"
      :<ThemeProvider theme={darkTheme}>
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
                LOGIN
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Login to your account
              </Typography>
              <Stack spacing={2}>
                <FormControl style={{ margin: "20px"}}>
                  <InputLabel htmlFor="login-email">Email</InputLabel>
                  <OutlinedInput
                    id="email-outlined"
                    value={values.email}
                    onChange={handleChange("email")}
                    label="Email"
                  />
                </FormControl>
                <FormControl style={{ margin: "20px" }}>
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <OutlinedInput
                    id="password-outlined"
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
                <Button
                  onClick={handleSubmit} 
                  variant="outlined" 
                  size="large"
                >
                  <div style={{fontSize: '1.2rem'}}>
                    LOGIN
                  </div>
                </Button>
              </CardActions>
            </CardContent>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Don't have an account? 
                  <NavLink style={{textDecoration: 'none', color: '#00C0FF'}} to='/signup'> Sign Up </NavLink>
                </Typography>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
}

export default Login;