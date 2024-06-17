import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import 'react-toastify/dist/ReactToastify.css';

export default function AnchorTemporaryDrawerPrice({productId, open, onClose}) {
    const navigate = useNavigate();
  const [price, setPrice] = React.useState(0); // State for price
  const [address, setAddress] = React.useState(''); 
  const [contact, setContact] = React.useState(''); 
  const [initialDataFetched, setInitialDataFetched] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState(null);
  const [sellers, setSellers] = React.useState([]);


  
  const handleSellerChange = async(event, newValue) => {
    try{
    const userId = newValue.id;
    const userAddress = newValue.address;
    const userContact = newValue.phone;
    const storedToken = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/users/getProductStatus/${userId}/${productId}`, {
    headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
    }
    });
    if(response?.data?.available){
        setSelectedSeller(newValue);
        setPrice(response.data.price);
        setAddress(userAddress);
        setContact(userContact);
    } else {
        toast.error('Product unavailable for this seller');
        setSelectedSeller({});
    }}catch(error) {
      console.error('Error fetching initial data:', error);
    }
  }

  useEffect(() => {
    // Fetch initial status and price from database
    async function fetchInitialData() {
      try {
        const storedToken = localStorage.getItem('token');
        axios.get(`http://localhost:3000/users/getAvailableSellers/${productId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          }).then(response => {
            setSellers(response.data);
            setInitialDataFetched(true);
          })
          .catch(error => {
            if(error.response.data.message === 'TokenExpiredError') {
              localStorage.removeItem('token');
              navigate('/signin')
              return;
      }}) 
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    if (open && !initialDataFetched) {
      fetchInitialData(); // Fetch initial data when the drawer is opened
    }
  }, [open, initialDataFetched]);

  if(!initialDataFetched) return null;

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
          >
            <Box sx={{ p: 10,  }}>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleSellerChange}
      value = {selectedSeller}
      options={sellers}
      getOptionLabel={(option) => (option?.firstName ?? "") + " " + (option?.lastName ?? "")}
      sx={{width: 250}}
      renderInput={(params) => <TextField {...params} label="Select Seller" variant= "outlined" sx={{
        '& input': {
            border: 'none'
        },
    }} />}
    />
        {selectedSeller?.id && (
          <>
            <div>
              <TextField
                id="price"
                label="Price"
                type="number"
                value= { price }
                fullWidth
                InputProps={{
                    readOnly: true, // Make the TextField read-only
                }}
                sx={{ marginTop: '20px' }}
              />
            </div>

            <div>
              <TextField
                id="contact"
                label="Contact Number"
                type="string"
                value= { contact }
                fullWidth
                InputProps={{
                    readOnly: true, // Make the TextField read-only
                }}
                sx={{ marginTop: '20px' }}
              />
            </div>

            <div>
              <TextField
                id="address"
                label="Address"
                type="string"
                value= { address }
                multiline
                fullWidth
                InputProps={{
                    readOnly: true, // Make the TextField read-only
                }}
                sx={{ marginTop: '20px' }}
              />
            </div>
          </>
        )}
      </Box>
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer position='top-right'></ToastContainer>
    </div>
  );
}