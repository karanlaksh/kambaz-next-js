"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Signup</h2>
      <Form>
        <Form.Control placeholder="username" className="mb-3" />
        <Form.Control placeholder="password" type="password" className="mb-3" />
         <Form.Control placeholder="repeat password" type="password" className="mb-3" />
        <Link href="/Account/Profile" passHref legacyBehavior>
          <Button variant="primary" className="w-100 mb-3">Signup</Button>
        </Link>
        <Link href="/Account/Signin">Signin</Link>
      </Form>
    </div>
  );
}
