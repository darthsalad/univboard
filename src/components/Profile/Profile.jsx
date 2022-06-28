import React, { useContext } from 'react'
import { AuthContext, token } from '../../AuthContext'
import{
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from 'axios';

<br />
const Profile = () => {
  const auth = useContext(AuthContext);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const logout = async () => {
    await axios({
      method: "get",
      url: "http://localohost:5000/api/user/logout",
      withCredentials: true,
      headers: { "auth-token": token },
    }).then((props) => {
      localStorage.removeItem("auth-token");
      console.log(props);
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        width: 'auto',
        backgroundColor: "#2b2a33",
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'auto 10%'
      }}
      >
    {auth 
        ? <div style={{padding: '10px'}}>
          <Card 
            sx={{ 
              minWidth: 275,
              margin: 3,
              textAlign: 'center'
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="h5" sx={{mb: 1.5}}>
                Name: {auth.data.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ID: {auth.data.id}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Email: {auth.data.email}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                No. of notes: {auth.data.clipboard}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date of creation: {Date(auth.data.date_created).toString()}
              </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent:"center", alignItems: "center"}}>
              <Button onClick={logout} color="error">Logout</Button>
            </CardActions>
          </Card>
          </div>
        : window.location="/"
      }
    </div>
    </ThemeProvider>
  )
}

export default Profile