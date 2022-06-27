import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Button } from '@mui/material'
import { token, AuthContext } from '../../AuthContext'
import axios from "axios"

const Home = () => {
  const auth = useContext(AuthContext);

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
      <div
        style={{
            minHeight: "100vh",
            minWidth: '100vw',
            width: 'auto',
            backgroundColor: "#374151",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'auto 10%'
        }}
      >
        Home Page
        {auth
          ? 
          <div
            style={{

            }}
          >
            <div className="navbar">
              <NavLink style={{ textDecoration: "none" }} to="/profile">
                <Button variant="outlined">Profile</Button>
              </NavLink>
              <Button onClick={logout} variant="outlined">logout</Button>
            </div>
            <div>
              {auth.data.user}
            </div>
          </div> 
          : 
          <>
            <NavLink style={{ textDecoration: "none" }} to="/login">
              <Button variant="outlined">login</Button>
            </NavLink>
          </>
        }
      </div>
    </ThemeProvider>
  );
};

export default Home;
