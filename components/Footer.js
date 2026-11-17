import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name">
        {profile.firstName} {profile.lastName}
      </p>
      <p>
        Designed &amp; coded with <span className="beat">♡</span> · © {new Date().getFullYear()}
      </p>
      <a href="#top" className="footer-top">
        back to top ↑
      </a>
    </footer>
  );
}
