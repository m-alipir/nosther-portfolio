import type { Dictionary } from "@/content/dictionaries";
import styles from "./footer.module.css";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={"container " + styles.inner}>
        <p>{dictionary.footer.identity}</p>
        <p>
          © {year} ALI. {dictionary.footer.rights}
        </p>
      </div>
    </footer>
  );
}
