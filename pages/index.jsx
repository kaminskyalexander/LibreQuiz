import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button } from "@mui/material";

import starIcon from "../public/img/star.svg";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={starIcon} alt="Star icon" />
        </div>
        <div className={styles.buttons}>
          <Button variant="contained">Log In</Button>
          <Button variant="outlined">Sign Up</Button>
        </div>
      </header>
    </>
  );
}
