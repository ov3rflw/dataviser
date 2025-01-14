import styles from "./page.module.css";
import Navbar from "@/Components/Navbar/Navbar";
import Main from "@/Components/Main/Main"

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Main />
    </div>
  );
}
