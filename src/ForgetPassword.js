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

// const nodemailer = require('nodemailer');

// // Generate a random secret key (replace this with your own logic)
// const generateSecretKey = () => {
//   return Math.random().toString(36).substring(2, 10); // Generate an 8-character random string
// };

// // Send email with secret key
// const sendVerificationEmail = async (email, secretKey) => {
//   // Create a Nodemailer transporter
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//   auth: {
//     user: 'nayanabhishek789@gmail.com',
//     pass: 'nayan.710'
//   }
//   });

//   // Send email
//   await transporter.sendMail({
//     from: 'nayanabhishek789@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Your secret key for email verification is: ${secretKey}`
//   });
// };

// // Compare provided key with the one saved in the database
// const compareSecretKeys = (providedKey, savedKey) => {
//   return providedKey === savedKey;
// };

// // Example usage
// const userEmailAddress = 'nayanabhishek710@gmail.com';
// const secretKey = generateSecretKey();

// Save secret key in database along with user email address
// (Replace this with your database logic)

// Send email containing secret key





















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
                // sendVerificationEmail(userEmailAddress, secretKey)
                //   .then(() => {
                //     console.log('Email sent successfully!');
                //     // Now wait for the user to input the secret key
                //   })
                //   .catch((error) => {
                //     console.error('Error sending email:', error);
                //   });
        }else {
          // compareSecretKeys(data.get('otp'), secretKey)
          //   .then((isMatch) => {
          //     if (isMatch) {
          //       console.log('Secret keys match! Proceed with verification.');
          //       // Proceed with desired action (e.g., password reset, account activation)
          //     } else {
          //       console.log('Secret keys do not match. Verification failed.');
          //       // Handle verification failure
          //     }
          //   })
          //   .catch((error) => {
          //     console.error('Error comparing secret keys:', error);
          //   });
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