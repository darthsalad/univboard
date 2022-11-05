import React, { useContext } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography 
} from '@mui/material'
import { token, AuthContext } from '../../AuthContext'
import axios from "axios"

const Home = () => {
  const [clips, setClips] = React.useState([]);
  const auth = useContext(AuthContext);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  React.useEffect(() => {
    const fetchClips = async() => {
      await axios({
        url: "http://localhost:5000/api/clips/history",
        method: "get",
        withCredentials: true,
        headers: {'auth-token': token}
      }).then((props) => {
        // console.log(props.data);
        setClips(props.data)
      }).catch((err) => {
        console.log(err);
      })
    }
    fetchClips();
    // console.log(auth);
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
            margin: 0,
            height: "auto",
            width: 'auto',
            backgroundColor: "#2b2a33",
            // display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'auto 10%'
        }}
      >
        {auth
          ? 
          <div
            style={{

            }}
          >
            <div>
              <Typography variant="h3">Clipboard</Typography>
              {clips.map((item) => {
                  return (
                    <Card
                      key={item._id} 
                      sx={{
                          margin: "20px 10px",
                          maxWidth: 345, 
                        }}
                    >
                      <CardActionArea>
                        <CardContent>
                          {/* <Typography gutterBottom variant="h5" component="div">
                            Note Title 
                            <Typography variant="body1" color="text.secondary">Date</Typography>
                          </Typography> */}
                          <Typography variant="body1" color="text.secondary">
                            {item.text}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )
              })}
            </div>
          </div> 
          : 
          <>
            Please Login to see your clipboard history
          </>
        }
      </div>
    </ThemeProvider>
  );
};

export default Home;
