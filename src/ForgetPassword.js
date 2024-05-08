import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SuperMart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function ForgetPassword() {








    const [isOTPSent, setIsOTPSent] = useState(false);
    const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        if(!isOTPSent) {
            const email = data.get('email');
            setEmail(email);
            setIsOTPSent(!isOTPSent);
  
        }else {
            const newPassword = data.get('newPassword');
            const confirmPassword = data.get('confirmPassword');
            if(newPassword === confirmPassword) {
                const formData = { password: newPassword, email: email }
                const storedToken = localStorage.getItem('token');
                console.log({storedToken})
                axios.post(`http://localhost:3000/users/updatePassword`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
                }).then(response => {
                  navigate('/signin')
                // Product added successfully, show notification
                })
                .catch(error => {
                    if(error.response.data.message === 'TokenExpiredError') {
                    localStorage.removeItem('token');
                    navigate('/signin')
                    return;
                    }
                    console.error('Error adding products:', error);
                navigate('/signin')
            })}}
    }catch(error) {
        console.error('Error fetching categories:', error);
    }
    };

  return (
    <ThemeProvider theme={useTheme(defaultTheme)}>
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
           
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
           {!isOTPSent && <TextField
            InputProps={{
              classes: {
                notchedOutline: true
              }
            }}
            variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ '& input': { padding: '25px',border:"0px" } }}
          
            />}

{isOTPSent && <TextField
            InputProps={{
              classes: {
                notchedOutline: true
              }
            }}
            variant="outlined"
              margin="normal"
              required
              fullWidth
              label="OTP"
              id="otp"
              name="otp"
              autoComplete="otp"
              autoFocus
              sx={{ '& input': { padding: '25px',border:"0px" } }}
          
            />}

{isOTPSent && <TextField
            InputProps={{
              classes: {
                notchedOutline: true
              }
            }}
            variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              id="newPassword"
              disabled={!isOTPSent}
              name="newPassword"
              autoComplete="newPassword"
              autoFocus
              sx={{ '& input': { padding: '25px',border:"0px" } }}
          
            />}

{isOTPSent && <TextField
            InputProps={{
              classes: {
                notchedOutline: true
              }
            }}
            variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="confirmPassword"
              disabled={!isOTPSent}
              autoFocus
              sx={{ '& input': { padding: '25px',border:"0px" } }}
          
            />}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Reset Password
            </Button>


            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}