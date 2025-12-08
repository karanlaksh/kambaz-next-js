"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";
import { User } from "../../../Account/types";

export default function People() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const courseUsers = await coursesClient.findUsersForCourse(courseId);
    setUsers(courseUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}