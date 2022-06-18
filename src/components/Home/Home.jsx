import React from "react"
import { NavLink } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Button } from '@mui/material'
import { useAuth, token } from '../../authState'
import axios from "axios"

const Home = () => {
  const auth = useAuth();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  React.useEffect(() => {
    console.log(auth);
    // eslint-disable-next-line
  }, [])

  const logout = async() => {
    await axios({
      method: 'get',
      url: 'http://localohost:5000/api/user/logout',
      withCredentials: true,
      headers: {"auth-token": token}
    }).then((props) => {
      localStorage.removeItem('auth-token')
      console.log(props);
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        Home Page
        <NavLink style={{ textDecoration: "none" }} to="/login">
          <Button variant="outlined">login</Button>
        </NavLink>
        <Button onClick={logout} variant="outlined">logout</Button>
      </div>
    </ThemeProvider>
  );
};

export default Home;
