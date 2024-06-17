import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AnchorTemporaryDrawer from './RightDrawer.js';
import AnchorTemporaryDrawerPrice from './RightDrawerForPrice.js';



export default function MultiActionAreaCard({productId, productName, productDescription, type, handleProductSelect, imageLink, weight}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClick = () => {
    setDrawerOpen(true);
  };
  
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  
  return (
    <div>
      {(type === 'Remove') && <AnchorTemporaryDrawer productId = {productId} open={drawerOpen} onClose={handleCloseDrawer} />}
      {(type === 'All') && <AnchorTemporaryDrawerPrice productId = {productId} open={drawerOpen} onClose={handleCloseDrawer} />}
    <Card sx={{ maxWidth: 345, "&:hover": {backgroundColor: "#E6E6FA"} }} onClick={handleClick}>
        <CardMedia
          component="img"
          height="260"
          image={imageLink}
          alt="green iguana"
        />
        <CardContent>
          <Typography sx = {{ minHeight: "2.5em", maxHeight: "2.5em", overflow: 'hidden' }} gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          <Typography sx = {{ minHeight: "1.5em", maxHeight: "1.5em", overflow: 'hidden' }} gutterBottom variant="h5" component="div">
            {weight}
          </Typography>
          <Typography style={{ minHeight: '4.5em', maxHeight: '4.5em', overflow: 'hidden' }} variant="body2" color="text.secondary">
            {productDescription}
          </Typography>
        </CardContent>
      {type !== 'All' && <CardActions>
        <Button size="small" color="primary" onClick={() => handleProductSelect(productId)}>
          {type} Product
        </Button>
        
      </CardActions>}
    </Card>
    </div>
  );
}