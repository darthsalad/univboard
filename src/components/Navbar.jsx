import React, { useContext } from "react";
import { AuthContext, token } from "../AuthContext";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const logout = async () => {
    await axios({
      method: "get",
      url: "http://localhost:5000/api/user/logout",
      withCredentials: true,
      headers: { "auth-token": token },
    }).then((props) => {
      localStorage.removeItem("auth-token");
      console.log(props);
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink style={{textDecoration: "none", color: "white"}} to="/">
              UnivBoard
            </NavLink>
            </Typography>
            {auth ? (
              <>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    style={{minWidth: '100px'}}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        // elevation: 1,
                        sx: {
                           minWidth: '100px'
                        }
                    }}
                  >
                    <NavLink
                      style={{ textDecoration: "none", color: "white" }}
                      to="/profile"
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </NavLink>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
                {/* <div className="navbar">
                            <NavLink style={{ textDecoration: "none", color: "white" }} to="/profile">
                            <Button color="inherit">Profile</Button>
                            </NavLink>
                            <Button onClick={logout} color="inherit">logout</Button>
                        </div> */}
              </>
            ) : (
              <>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button variant="outlined">login</Button>
                </NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

// {auth
//     ?
//     <div
//     style={{

//     }}
//     >
//     <div className="navbar">
//         <NavLink style={{ textDecoration: "none" }} to="/profile">
//         <Button variant="outlined">Profile</Button>
//         </NavLink>
//         <Button onClick={logout} color="error" variant="outlined">logout</Button>
//     </div>
//     </div>
//     :
//     <>
//         <NavLink style={{ textDecoration: "none" }} to="/login">
//         <Button variant="outlined">login</Button>
//         </NavLink>
//     </>
// }
