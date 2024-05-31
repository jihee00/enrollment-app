import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Layout>
      <header>
        <div className={styles.headerContent}>
          <h1>Seneca Polytechnic</h1>
        </div>
      </header>
      <main>
        <section className={styles.hero}>
          <h2>Welcome to Seneca Polytechnic</h2>
          <p>Explore our programs and services</p>
        </section>
        <section className={styles.content}>
          <div className={styles.card}>
            <h3>Programs</h3>
            <p>Discover our wide range of programs</p>
          </div>
          <div className={styles.card}>
            <h3>Apply Now</h3>
            <p>Join us and start your journey</p>
          </div>
          <div className={styles.card}>
            <h3>Contact Us</h3>
            <p>Get in touch for more information</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Seneca Polytechnic</p>
      </footer>

      </Layout>
    </>
  );
}