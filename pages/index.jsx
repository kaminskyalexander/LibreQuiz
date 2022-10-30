import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button } from "@mui/material";

import starIcon from "../public/img/star.svg";
import mockup from "../public/img/mockup.png";

export default function Home() {
  return (
    <div className="page">
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={starIcon} alt="Star icon" />
        </div>
        <div className={styles.buttons}>
          <Button variant="contained">Log In</Button>
          <Button variant="outlined">Sign Up</Button>
        </div>
      </header>
      <main>
        <div>
          <h1>Lorem ipsum dolor sit amet</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vehicula ipsum tempor pulvinar suscipit. In hac habitasse platea
            dictumst. Quisque convallis commodo felis eget hendrerit.
          </p>
          <Button variant="contained">Get Started</Button>
        </div>
        <div className="mockup">
          <Image src={mockup} alt="Mockup" />
        </div>
      </main>
    </div>
  );
}
