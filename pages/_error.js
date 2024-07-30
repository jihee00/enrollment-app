'use client';
import React from 'react'
import Link from 'next/link'
import { FaExclamationCircle } from 'react-icons/fa'
import styles from '../styles/Home.module.css';

const Error = ({ statusCode }) => {
  return (
    <section className={styles.bg404}>
      <div className={styles.card + " " + styles.centerCard}>
        <div className={styles.icon404}>
          <FaExclamationCircle className={styles.textYellow400}></FaExclamationCircle>
        </div>
        <div className={styles.textCenter}>
          <h1 className={styles.fontBold}>Something Went Wrong</h1>
          <p className={styles.textGray500}>
            {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
          </p>
          <Link href="/" className={styles.linkButton}>Go Home</Link>
        </div>
      </div>
  </section>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error