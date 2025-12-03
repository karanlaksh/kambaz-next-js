"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as db from "../../../Database";
import * as client from "../../../Account/client";
import { User } from "../../../Account/types";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const { enrollments } = db;

  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    const fullCourseId = `CS${cid}`;
    const courseUsers = allUsers.filter((usr: User) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === usr._id && enrollment.course === fullCourseId
      )
    );
    setUsers(courseUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}