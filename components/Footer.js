import React from 'react';
import Image from 'next/image';
import logo from '@/public/images/seneca-polytechnic.png';
import styles from '../styles/Home.module.css'; 

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div>
        <p>&copy; 2024 Seneca polytechnic. All rights reserved. </p>
      </div> 
    </footer>
  )
}

export default Footer;