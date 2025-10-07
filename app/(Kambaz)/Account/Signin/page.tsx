"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Signin</h2>
      <Form>
        <Form.Control placeholder="username" className="mb-3" defaultValue="GuestUser" />
        <Form.Control placeholder="password" type="password" className="mb-3" defaultValue="pass123" />
        <Link href="/Dashboard" passHref legacyBehavior>
          <Button variant="primary" className="w-100 mb-3">Signin</Button>
        </Link>
        <Link href="/Account/Signup">Signup</Link>
      </Form>
    </div>
  );
}