import React from "react";

function About() {
  return (
    <div className="container py-5 mt-5">
      <h1 className="mb-4">About Us</h1>
      <p className="lead">
        We are a passionate team dedicated to providing high-quality products and services
        tailored to meet the needs of our customers. With years of experience in the industry,
        we pride ourselves on delivering excellence and building long-term relationships.
      </p>

      <h2 className="mt-5 mb-3">Our Mission</h2>
      <p>
        Our mission is to make life easier and more enjoyable for our customers by offering innovative
        solutions, reliable services, and exceptional support.
      </p>

      <h2 className="mt-5 mb-3">Our Values</h2>
      <ul>
        <li>✅ Customer Satisfaction</li>
        <li>✅ Innovation & Creativity</li>
        <li>✅ Integrity & Transparency</li>
        <li>✅ Continuous Improvement</li>
      </ul>

      <h2 className="mt-5 mb-3">Contact Us</h2>
      <p>
        Have questions or want to know more? Feel free to reach out to us anytime.
      </p>
      <p>
        📧 Email: info@example.com<br />
        📞 Phone: +66 1234 5678<br />
        📍 Location: Bangkok, Thailand
      </p>
    </div>
  );
}

export default About;
