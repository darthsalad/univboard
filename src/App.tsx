import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavbarComponent, Navbar2 from "./components/Navbar/NavbarComponent";
import Home from "./pages/Home/Home";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from '@mantine/notifications';
import Navbar2 from "./components/NavbarComponent/NavbarComponent";
// import LoaderAnimation from "./components/Loader/Loader";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <ModalsProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <Navbar2>
            {/* <LoaderAnimation /> */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Navbar2>
        </BrowserRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
