import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddIcon from '@mui/icons-material/Add';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBox from './SearchBox';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 225;

export default function PermanentDrawerLeft({firstLetter, setSearchText, showSearchBar}) {
  const location = useLocation()
    const navigate = useNavigate()
  const drawrItems = [{name: 'Add Products', link: '/products/all', icon: AddIcon}, {name: 'Your Products', link: '/products/selected', icon: ShoppingCartIcon}, {name: 'Check Price', link: '/checkPrice', icon: PriceCheckIcon}];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile')
  };
  const handleSignOut = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/signin')
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleKeyPress = (event) => {
    if(event.key === "Enter") {
        setSearchText(event.target.value);
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#E6E6FA' }}
        
      >
        <Toolbar>
        {showSearchBar && <InputBase style={{ color: '#000000' }} onKeyDown={handleKeyPress} fullWidth placeholder="Search for products, brands and more" />}
        <div style = {{flexGrow: 1}}/>
        <Button
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
            
          <Avatar sx={{ bgcolor: '#5941A9' }}>{firstLetter}</Avatar>
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          
        >
          <MenuItem style={{ color: '#E0479E' }} onClick={handleProfile}>Profile</MenuItem>
          <MenuItem style={{ color: '#E0479E' }} onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer} style={{ textDecoration: 'none', color: '#E0479E' }} >
        <List>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#E6E6FA'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {drawrItems.map((text, index) => (
            location.pathname.includes(text.link) ?
            <Link to={text.link} style={{ textDecoration: 'none', color: '#E0479E' }}>
            <ListItem key={text.name} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <text.icon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
                </ListItemButton>
            </ListItem>
            </Link>: <Link to={text.link} style={{ textDecoration: 'none', color: '#5941A9' }}>
            <ListItem key={text.name} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <text.icon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
                </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}