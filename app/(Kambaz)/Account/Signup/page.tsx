"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const handleSignup = () => {
    // In a real app, this would create a new user
    // For now, just redirect to signin
    router.push("/Account/Signin");
  };

  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign up</h2>
      <Form>
        <Form.Control placeholder="username" className="mb-3" />
        <Form.Control placeholder="password" type="password" className="mb-3" />
        <Form.Control placeholder="repeat password" type="password" className="mb-3" />
        <Button 
          variant="primary" 
          className="w-100 mb-3"
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <Link href="/Account/Signin">Signin</Link>
      </Form>
    </div>
  );
}
