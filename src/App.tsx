import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthContext, AuthProvider } from "./AuthContext";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import Reset from "./pages/Auth/Reset";
import { ErrorPage } from "./pages/Error/Error";

function App() {
  // const auth = useContext(AuthContext);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <ModalsProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <AuthProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot_password" element={<Forgot />} />
                  <Route path="/reset_password/:resetToken" element={<Reset />} />
                  <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </AuthProvider>
          </BrowserRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
