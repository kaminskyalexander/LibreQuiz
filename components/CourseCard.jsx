import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CourseCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        alt="Course Banner Image"
        image={props.bannerImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.courseTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.courseDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
