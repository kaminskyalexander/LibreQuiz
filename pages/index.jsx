import Image from "next/image";
import styles from "../styles/Home.module.css";

import starIcon from "../public/img/star.svg";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div>
          <Image />
        </div>
      </header>
    </>
  );
}
