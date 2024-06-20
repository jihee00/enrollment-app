import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <header>
        <div className={styles.headerContent}>
          <h2>Welcome to Seneca Polytechnic</h2>
        </div>
      </header> */}
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/student-home.jpg"
              alt="Student Home Image"
              layout="fill"
              objectFit="cover"
              quality={100}
              className={styles.heroImage}
            />
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.card}>
            <h3>Build Schedule</h3>
            <p>Manage Classes</p>
          </div>
          <div className={styles.card}>
            <h3>Academic Records</h3>
            <p>GPA Calculator</p>
          </div>
          <div className={styles.card}>
            <Link
              href="/advisor"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3>Contact Us</h3>
              <p>Contact Student Advisor</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
