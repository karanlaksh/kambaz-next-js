"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin({ loginId: credentials.username });
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: unknown) {
      setError("Sign in failed. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign in</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form>
        <Form.Control
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="mb-3"
          placeholder="username"
          id="wd-username"
        />
        <Form.Control
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="mb-3"
          placeholder="password"
          type="password"
          id="wd-password"
        />
        <Button
          onClick={signin}
          id="wd-signin-btn"
          variant="primary"
          className="w-100 mb-3"
        >
          Sign in
        </Button>
        <Link id="wd-signup-link" href="/Account/Signup">
          Sign up
        </Link>
      </Form>
    </div>
  );
}