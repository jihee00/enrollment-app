// pages/advisor.js
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Advisor() {
  const router = useRouter();
  const [advisors, setAdvisors] = useState([
    {
      id: 132125432,
      name: "John Johnson",
      email: "john.johnson@example.com",
      phone: "647-887-3654",
      sin: "123-456-789",
    },
    {
      id: 221546454,
      name: "James Smith",
      email: "james.smith@example.com",
      phone: "416-553-9837",
      sin: "987-654-321",
    },
  ]);

  return (
    <div
      className={styles.advisor}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <h1>Student Advisor</h1>
        {advisors.map((advisor) => (
          <div
            className={styles.advisorInfo}
            key={advisor.id}
            style={{ display: "flex" }}
          >
            <Image
              className={styles.advisorImage}
              src="/images/profile.png"
              alt="Advisor image"
              width={180}
              height={180}
            />
            <div>
              <dl class="row">
                <dt class="col-sm-2">ID:</dt>
                <dd class="col-sm-10">{advisor.id}</dd>
                <dt class="col-sm-2">Name:</dt>
                <dd class="col-sm-10">{advisor.name}</dd>
                <dt class="col-sm-2">Phone:</dt>
                <dd class="col-sm-10">{advisor.phone}</dd>
                <dt class="col-sm-2">Email:</dt>
                <dd class="col-sm-10">{advisor.email}</dd>
                <dt class="col-sm-2">SIN:</dt>
                <dd class="col-sm-10">{advisor.sin}</dd>
              </dl>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.studentInfo}>
        <Image
          className={styles.studentImage}
          src="/images/profile.png"
          alt="Advisor image"
          width={180}
          height={180}
        />
        <h4>Eric Yang</h4>
        <dl class="row">
          <dt class="col-sm-4">Student ID:</dt>
          <dd class="col-sm-8">1329903213</dd>
          <dt class="col-sm-4">Email:</dt>
          <dd class="col-sm-8">sample@myseneca.ca</dd>
          <dt class="col-sm-4">Address:</dt>
          <dd class="col-sm-8">170 Finch Ave East</dd>
          <dt class="col-sm-4">Phone Number:</dt>
          <dd class="col-sm-8">(647)-892-9799</dd>
        </dl>
      </div>
    </div>
  );
}
