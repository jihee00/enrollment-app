import React from 'react'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from '../styles/Home.module.css';

const Custom404 = () => {
  return (
    <section className={styles.bg404}>
      <div className={styles.card + " " + styles.centerCard}>
        <div className={styles.icon404}>
          <FaExclamationTriangle className={styles.textYellow400}></FaExclamationTriangle>
        </div>
        <div className={styles.textCenter}>
          <h1 className={styles.fontBold}>Page Not Found</h1>
          <p className={styles.textGray500}>
            The page you are looking for does not exist.
          </p>
          <Link href="/" className={styles.linkButton}>Go Home</Link>
        </div>
      </div>
  </section>
  )
}

export default Custom404