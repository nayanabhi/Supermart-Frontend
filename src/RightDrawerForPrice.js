import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AnchorTemporaryDrawerPrice({productId, open, onClose}) {
    const navigate = useNavigate();
    const [status, setStatus] = React.useState(false); // State for status (on/off)
  const [price, setPrice] = React.useState(0); // State for price
  const [initialDataFetched, setInitialDataFetched] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState({
    userId: '',
    price: 0,
    available: false,
    sellerId: '',
    id: '',
  });
  const [sellers, setSellers] = React.useState([]);


  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };
  const handleSellerChange = async(event) => {
    
    console.log({4343242: event.target.value});
    const userId = event.target.value.id;
    const storedToken = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/users/getProductStatus/${userId}/${productId}`, {
    headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
    }
    });
    console.log({543545: response.data})
    if(response?.data?.available){
        setSelectedSeller(event.target.value);
        setPrice(response.data.price);
    } else {
        toast.error('Product unavailable for this seller');
    }
  }

  const handleSubmit = async(event) => {
    // const formData = {
    //     productId,
    //     status,
    //     price
    // }
    // const storedToken = localStorage.getItem('token');
    // const response = await axios.post('http://localhost:3000/users/updateProductStatus', formData, {
    // headers: {
    //     'Authorization': `Bearer ${storedToken}`,
    //     'Content-Type': 'application/json'
    // }
    // });
    // setStatus(event.target.checked);

  };

  useEffect(() => {
    // Fetch initial status and price from database
    async function fetchInitialData() {
      try {
        const storedToken = localStorage.getItem('token');
        axios.get(`http://localhost:3000/users/all`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          }).then(response => {
            setSellers(response.data);
            setInitialDataFetched(true);
          })
          .catch(error => {
            console.log({43435: error, error})
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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
            {/* {list(anchor)} */}
            <Box sx={{ p: 2 }}>
            <div>
          <label htmlFor="seller">Select Seller:</label>
          <Select
            id="seller"
            value={selectedSeller}
            onChange={handleSellerChange}
            fullWidth
          >
            {sellers.map((seller) => (
              <MenuItem key={seller.id} value={seller}>
                {seller.firstName + ' ' + seller.lastName}
              </MenuItem>
            ))}
          </Select>
        </div>
        {selectedSeller.id && (
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