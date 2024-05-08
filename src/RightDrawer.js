import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
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

export default function AnchorTemporaryDrawer({productId, open, onClose}) {
    const navigate = useNavigate();
    const [status, setStatus] = React.useState(false); // State for status (on/off)
  const [price, setPrice] = React.useState(0); // State for price
  const [initialDataFetched, setInitialDataFetched] = React.useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = async(event) => {
    const formData = {
        productId,
        status,
        price
    }
    const storedToken = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/users/updateProductStatus', formData, {
    headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
    }
    });
    // setStatus(event.target.checked);

  };

  useEffect(() => {
    // Fetch initial status and price from database
    async function fetchInitialData() {
      try {
        const storedToken = localStorage.getItem('token');
        axios.get(`http://localhost:3000/users/getProductStatus/${productId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          }).then(response => {
            setStatus(response.data.available); // Update status state with fetched status
            setPrice(response.data.price);  
            setInitialDataFetched(true); // Update initial data fetched state
          })
          .catch(error => {
            console.log({43435: error, error})
            if(error.response.data.message === 'TokenExpiredError') {
              localStorage.removeItem('token');
              navigate('/signin')
              return;
      }}) // Call your database service or repository function here
          // Update price state with fetched price
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    if (open && !initialDataFetched) {
      fetchInitialData(); // Fetch initial data when the drawer is opened
    }
  }, [open, initialDataFetched]);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  if(!initialDataFetched) return null;

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
          >
            {/* {list(anchor)} */}
            <Box sx={{ p: 2 }}>
        <div>
          <label htmlFor="status">Availability Status:</label>
          <Switch
            id="status"
            checked={status}
            onChange={handleStatusChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div>
          <TextField
            id="price"
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
        </div>

        <div>
           <Button
            id="submit"
            variant="contained" // Add variant prop
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}