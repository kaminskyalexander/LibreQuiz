import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';

import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function AppDrawer({ open, setOpen }) {
  const router = useRouter();
  const { user } = useAuth();

  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    return onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      (async () => {
        const enrolledCourses = snapshot.data().enrolledCourses;
        const ownedCourses = snapshot.data().ownedCourses;
        let coursesTemp = [];

        for (const courseId of enrolledCourses) {
          const courseDoc = doc(db, "courses", courseId);
          const courseSnap = await getDoc(courseDoc)
          const courseData = courseSnap.data();
          coursesTemp.push({ id: courseId, ...courseData, href: "/course/" + courseId });
        }

        for (const courseId of ownedCourses) {
          const courseDoc = doc(db, "courses", courseId);
          const courseSnap = await getDoc(courseDoc)
          const courseData = courseSnap.data();
          coursesTemp.push({ id: courseId, ...courseData, href: "/teacher/" + courseId });
        }

        setCourses(coursesTemp);
      })();
    });
  }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {courses.map(({id, name, href}, index) => (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={() => router.push(href)}>
                <ListItemIcon/>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}