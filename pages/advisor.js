// pages/advisor.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Advisor() {
  const router = useRouter();
  const [advisors, setAdvisors] = useState([
    { id: 132125432, name: 'John Johnson', email: 'john.johnson@example.com', phone: '647-887-3654', sin: '123-456-789' },
    { id: 221546454, name: 'James Smith', email: 'james.smith@example.com', phone: '416-553-9837', sin: '987-654-321' }
  ]);

  return (
    <div>
      <h1>Student Advisor</h1>
      {advisors.map(advisor => (
        <div key={advisor.id}>
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
      ))}

      <div>
            <dl class="row">
                <dt class="col-sm-2">Student ID:</dt>
                <dd class="col-sm-10">1329903213</dd>
                <dt class="col-sm-2">Email:</dt>
                <dd class="col-sm-10">sample@myseneca.ca</dd>
                <dt class="col-sm-2">Address:</dt>
                <dd class="col-sm-10">170 Finch Ave East</dd>
                <dt class="col-sm-2">Phone Number:</dt>
                <dd class="col-sm-10">(647)-892-9799</dd>
            </dl>
      </div>
    </div>
  );
}
