"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { Form, Button } from "react-bootstrap";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: User) => u.loginId === credentials.username
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign in</h2>
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