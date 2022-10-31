import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';

export default function CourseCard({ name, time, description, thumbnail, href }) {
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 345 }}>
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
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                console.log("Button clicked");
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          style={{ "paddingBottom": 0 }}
        />
        <CardContent style={{ "paddingTop": 0 }}>
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
