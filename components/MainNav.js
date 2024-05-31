
import { Navbar, Nav } from "react-bootstrap";
import Image from 'next/image';
import styles from '../styles/Home.module.css'; 

export default function MainNav() {
  return (
    <Navbar className={styles.redNavbar} expand="lg">
      <Navbar.Brand href="/" className={styles.navbarBrand}>
        <Image src="/images/seneca-white.png" alt="Seneca Logo" width={140} height={35} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
        <Nav className="ml-auto">
          <Nav.Link href="/register" className={styles.navLink}>Register</Nav.Link>
          <Nav.Link href="/login" className={styles.navLink}>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}