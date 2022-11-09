import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavbarComponent, Navbar2 from "./components/Navbar/NavbarComponent";
import Home from "./pages/Home/Home";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthContext, AuthProvider } from "./AuthContext";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
// import LoaderAnimation from "./components/Loader/Loader";

function App() {
  const auth = useContext(AuthContext);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <ModalsProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <AuthProvider>
              
                {/* <LoaderAnimation /> */}
                <Routes>
                  <Route path="/" element={auth ? <Home /> : <Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/reset_password" element={<Forgot />} />
                </Routes>
            </AuthProvider>
          </BrowserRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
