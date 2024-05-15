import "./styles.css";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard";
import SettingsCard from "./SettingsCard";

// FONTS
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PermanentDrawerTop from "./Drawer";

// STYLE & THEME
const theme = createTheme();

// APP
export default function Profile() {
  const [text, setText] = useState("");
  const [mainUser, setMainUser] = useState({
    username: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch categories from backend API
    const storedToken = localStorage.getItem('token');
    axios.get('http://localhost:3000/users/id', {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
          const {username, phone, address, email, password, firstName, lastName} = response.data; 
          setMainUser({username, phone, address, email, password, firstName, lastName});
      })
      .catch(error => {
        console.log({43435: error, error})
        if(error.response.data.message === 'TokenExpiredError') {
          localStorage.removeItem('token');
          navigate('/signin')
          return;
        }
        console.error('Error fetching categories:', error);
      });
  }, [refetchTrigger]);

  const fullName = `${mainUser.username}`;
//   console.log(mainUser)
if(mainUser.username === '') {
    return 
}else {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> {/* Adjust layout to display PermanentDrawerTop and product list */}
          <PermanentDrawerTop firstLetter = {mainUser.firstName[0]} showSearchBar = {false}/> {/* Render PermanentDrawerTop component */}
      
          {/* BACKGROUND */}
          <Grid container direction="column" sx={{ flexGrow: 1, maxWidth: '980px', margin: '0 auto' }}>
            

            {/* COMPONENTS */}
            <Grid
              container
              direction="column"
              spacing={3}
              sx={{
                position: "absolute",
                top: "20vh",
                px: { xs: 0, md: 7 }
              }}
            >
              {/* PROFILE CARD */}
              <Grid item>
                <ProfileCard
                  name={fullName}
                ></ProfileCard>
              </Grid>

              {/* SETTINGS CARD */}
              <Grid item>
                <SettingsCard
                  firstName={mainUser.firstName}
                  lastName={mainUser.lastName}
                  userName={mainUser.username}
                  phone={mainUser.phone}
                  email={mainUser.email}
                  password={mainUser.password}
                  gender={'male'}
                ></SettingsCard>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );}
}



