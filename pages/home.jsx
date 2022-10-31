import { Typography } from "@mui/material";
import CourseCard from "../components/CourseCard";

export default function Home() {
  return <>
    <Typography variant="h3" component="h1">My Courses</Typography>
    <CourseCard
      courseName="CS 135"
      courseTime="10:00 AM"
      courseDescription="Section 012"
      bannerImage="/img/banners/cs.jpg"
    />
  </>;
}
