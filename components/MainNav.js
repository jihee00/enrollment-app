// components/MainNav.js
import { useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from 'next/router';
import logo from "@/public/images/seneca-white.png";
import profileDefault from "@/public/images/profile.png";
import styles from "../styles/Home.module.css";
import { useAuth } from "@/lib/authContext";

export default function MainNav() {
    const { authenticated, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Listen for changes in authentication state
        const checkAuth = () => setAuthenticated(isAuthenticated());

        // Add an event listener to listen for storage changes
        window.addEventListener('storage', checkAuth);

        return () => {
            // Clean up the event listener
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleSignOut = () => {
        signOut();
        router.push('/');
    };

    return (
        <Navbar className={styles.redNavbar} expand="lg">
            <Navbar.Brand href="/" className={styles.navbarBrand}>
                <Image src={logo} alt="Seneca Logo" width={140} height={35} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
                <Nav className={styles.navLinks}>
                    {!authenticated && (
                        <>
                            <Nav.Link href="/register" className={styles.navLink}>
                                Register
                            </Nav.Link>
                            <Nav.Link href="/login" className={styles.navLink}>
                                Login
                            </Nav.Link>
                        </>
                    )}
                    {authenticated && (
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" className={styles.navLink}>
                                <Image
                                    src={profileDefault}
                                    alt="User Profile"
                                    width={35}
                                    height={35}
                                    className={styles.profileImage}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
                                <Dropdown.Item href="/profile/edit">Edit Profile</Dropdown.Item>
                                <Dropdown.Item href="/advisor">Advisor</Dropdown.Item>
                                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
