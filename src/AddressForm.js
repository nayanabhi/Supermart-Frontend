// AddressForm.js
import React from 'react';
import { TextField, Button } from '@mui/material';

const AddressForm = () => {
  return (
    <form>
      <TextField label="Address Line 1" fullWidth margin="normal" />
      <TextField label="Address Line 2" fullWidth margin="normal" />
      <TextField label="City" fullWidth margin="normal" />
      <TextField label="State" fullWidth margin="normal" />
      <TextField label="Postal Code" fullWidth margin="normal" />
      <Button variant="contained" color="primary" type="submit">
        Save Address
      </Button>
    </form>
  );
};

export default AddressForm;
