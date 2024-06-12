'use client';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Image from 'next/image';
import logo from '@/public/images/seneca-white.png';
import profileDefault from '@/public/images/profile.png';
import styles from '../styles/Home.module.css'; 

export default function MainNav() {
  return (
    <Navbar className={styles.redNavbar} expand="lg">
      <Navbar.Brand href="/" className={styles.navbarBrand}>
        <Image src={ logo } alt="Seneca Logo" width={140} height={35} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={styles.navLinks}>
        <Nav className={styles.navLinks}>
          <Nav.Link href="/register" className={styles.navLink}>Register</Nav.Link>
          <Nav.Link href="/login" className={styles.navLink}>Login</Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className={styles.navLink}>
                <Image src={profileDefault} alt="User Profile" width={35} height={35} className={styles.profileImage} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
              <Dropdown.Item href="/">Edit Profile</Dropdown.Item>
              <Dropdown.Item href="/">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}