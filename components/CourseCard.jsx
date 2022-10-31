import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CourseCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt="Course Thumbnail"
          image={props.thumbnail}
        />
        <CardHeader
          title={props.courseName}
          action={
            <IconButton
              aria-label="settings"
              onMouseDown={event => {event.stopPropagation();}}
              onClick={event => {
                event.stopPropagation();
                // Implement 3 dots button functionality here...
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          style={{ "paddingBottom": 0 }}
        />
        <CardContent style={{ "paddingTop": 0 }}>
          <Typography variant="body2" color="text.secondary">
            {props.courseTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.courseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
