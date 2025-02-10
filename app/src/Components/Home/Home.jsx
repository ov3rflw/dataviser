"use client";

import styles from "../../../page.module.css";
import Navbar from "../../../src/Components/Navbar/Navbar";
import Main from "../../../src/Components/Main/Main"

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Main />
    </div>
  );
}
