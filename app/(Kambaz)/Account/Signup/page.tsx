"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
  try {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/Account/Profile");
  } catch {
    setError("Signup failed. Username may be taken.");
  }
};

  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form>
        <Form.Control
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="mb-3"
          placeholder="username"
        />
        <Form.Control
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="mb-3"
          placeholder="password"
          type="password"
        />
        <Button variant="primary" className="w-100 mb-3" onClick={signup}>
          Sign up
        </Button>
        <Link href="/Account/Signin">Signin</Link>
      </Form>
    </div>
  );
}