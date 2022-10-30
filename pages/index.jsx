import Image from "next/image";
import styles from "../styles/Home.module.css";

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
