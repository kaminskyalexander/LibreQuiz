import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Button from '@mui/material/Button';

import starIcon from '../public/img/star.svg';
import mockup from '../public/img/mockup.png';

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
      <main className={`${styles.main} container`}>
        <div>
          <h1 className={styles.title}>Lorem ipsum dolor sit amet</h1>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vehicula ipsum tempor pulvinar suscipit. In hac habitasse platea
            dictumst. Quisque convallis commodo felis eget hendrerit.
          </p>
          <Button variant="contained">Get Started</Button>
        </div>
        <Image src={mockup} className={styles.mockup} />
      </main>
    </>
  );
}
