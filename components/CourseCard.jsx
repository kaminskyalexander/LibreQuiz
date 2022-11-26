import * as React from 'react';
import {
  Card, CardContent, CardActionArea, CardMedia, CardHeader, Typography, IconButton, Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';

export default function CourseCard({ name, time, description, thumbnail, href, onRemove }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  return (
    <Card>
      <CardActionArea component="div" onClick={event => { router.push(href) }}>
        <CardMedia
          component="img"
          height="140"
          alt="Course Thumbnail"
          image={thumbnail}
        />
        <CardHeader
          title={name}
          action={
            <IconButton
              aria-label="settings"
              onMouseDown={event => event.stopPropagation()}
              onTouch={event => {
                event.stopPropagation();
                event.preventDefault();
                handleMenu(event);
              }}
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                handleMenu(event);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Pin</MenuItem> */}
        <MenuItem onClick={() => { onRemove(); handleClose(); }}>Remove</MenuItem>
      </Menu>
    </Card>
  );
}
