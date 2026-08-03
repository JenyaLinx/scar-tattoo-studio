import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Header />
      <Hero />
    </main>
  );
}