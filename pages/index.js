import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/student-home.jpg"
              alt="Student Home Image"
              fill
              objectFit="cover"
              quality={100}
              className={styles.heroImage}
            />
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.card}>
          <Link
              href="/manage-schedule"
              style={{ textDecoration: "none", color: "black" }}
            >
            <h3>Build Schedule</h3>
            <p>Manage Classes</p>
            </Link>
         </div>
          <div className={styles.card}>
            <Link
              href="/academic-records"
              style={{ textDecoration: "none", color: "black" }}
            >
            <h3>Academic Records</h3>
            <p>GPA Calculator</p>
            </Link>
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
