"use client";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Profile</h2>
      <Form>
        <Form.Control defaultValue="alice" className="mb-3" />
        <Form.Control defaultValue="123" className="mb-3" />
        <Form.Control defaultValue="Alice" className="mb-3" />
        <Form.Control defaultValue="Wonderland" className="mb-3" />
        <Form.Control type="date" className="mb-3" />
        <Form.Control defaultValue="alice@wonderland.com" className="mb-3" />
        <Form.Control defaultValue="User" className="mb-3" />
        <a href="/Account/Signin">
          <Button variant="danger" className="w-100">Signout</Button>
        </a>
      </Form>
    </div>
  );
}
