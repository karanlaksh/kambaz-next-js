"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, User } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl, Form } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wd-profile-screen p-4" style={{ maxWidth: "600px" }}>
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Login ID</Form.Label>
          <FormControl
            id="wd-username"
            value={profile.loginId || ""}
            onChange={(e) =>
              setProfile({ ...profile, loginId: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <FormControl
            id="wd-firstname"
            value={profile.firstName || ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <FormControl
            id="wd-lastname"
            value={profile.lastName || ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Section</Form.Label>
          <FormControl
            id="wd-section"
            value={profile.section || ""}
            onChange={(e) =>
              setProfile({ ...profile, section: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            id="wd-role"
            value={profile.role || "STUDENT"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button onClick={signout} variant="danger" className="w-100" id="wd-signout-btn">
          Sign out
        </Button>
      </Form>
    </div>
  );
}