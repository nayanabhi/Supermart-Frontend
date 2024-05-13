// IMPORTS
import React, { useState } from "react";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CustomInput from "./CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//APP
    export default function SettingsCard({email, password, firstName, lastName, userName, gender, phone}) {
  //TAB STATES
  const navigate = useNavigate()

  const handleChange = (event) => {
    if(edit.isEdit === false) {
        const storedToken = localStorage.getItem('token');
    console.log({storedToken})
    axios.put(`http://localhost:3000/users/updateUser`, user, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Product added successfully, show notification
    //   toast.success('Product removed successfully', )
    })
      .catch(error => {
        if(error.response.data.message === 'TokenExpiredError') {
          localStorage.removeItem('token');
          navigate('/signin')
          return;
        }
        console.error('Error adding products:', error);
        // toast.error('Failed to remove product');
    })}

    // setValue(newValue);
    update(prevState => ({
        ...prevState,
        disabled: !prevState.disabled,
        isEdit: !prevState.isEdit
      }));

      


  };

  // GENDER SELECT STATES
  const genderSelect = [
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    }
  ];

  // FORM STATES
  const [user, setUser] = useState({
    // DEFAULT VALUES
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    gender: gender,
    phone: phone,
    email: email,
    pass: password,
    showPassword: false
  });

  const changeField = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true
  });

  // EDIT -> UPDATE
  const changeButton = (event) => {
    event.preventDefault();
    user.showPassword = false;
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    console.log("user: ", user);
  };

  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "80%", padding: 0 }}>

      {/* MAIN CONTENT CONTAINER */}
      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "80vh" },
            textAlign: { xs: "center", md: "start" }
          }}
        >
          {/* FIELDS */}
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              {/* ROW 1: FIRST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={changeField}
                  title="First Name"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              {/* ROW 1: LAST NAME */}
              <Grid component="form" item xs={6}>
                <CustomInput
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={changeField}
                  title="Last Name"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              {/* ROW 2: MIDDLE NAME */}
              <Grid item xs={6}>
                <CustomInput
                  id="userName"
                  name="userName"
                  value={user.userName}
                  onChange={changeField}
                  title="Username"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              {/* ROW 2: GENDER */}
              <Grid item xs={6}>
                <CustomInput
                  select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={changeField}
                  title="Gender"
                  dis={edit.disabled}
                  req={edit.required}
                  //MAP THRU OPTIONS
                  content={genderSelect.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                ></CustomInput>
              </Grid>

              {/* ROW 3: PHONE */}
              <Grid item xs={6}>
                <CustomInput
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={changeField}
                  title="Phone Number"
                  dis={edit.disabled}
                  req={edit.required}
                  //DIALING CODE
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    )
                  }}
                ></CustomInput>
              </Grid>

              {/* ROW 3: EMAIL */}
              <Grid item xs={6}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeField}
                  title="Email Address"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              

              {/* BUTTON */}
              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleChange}
                >
                  {edit.isEdit === false ? "UPDATE" : "EDIT"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}
