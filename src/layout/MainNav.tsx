import Link from "next/link";
import styles from "./mainNav.module.css";

export default function MainNav() {
  const links = [
    { title: "home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "About", path: "/" },
  ];
  return (
    <nav className={styles.nav}>
      {links.map(({ path, title }, i) => (
        <div key={`${path} ${i}`}>
          <Link href={path} className={`${styles.nav_link} crimson`}>
            {title}
          </Link>
        </div>
      ))}
    </nav>
  );
}
