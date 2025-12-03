"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import { User } from "../types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const filteredUsers = await client.findUsersByRole(selectedRole);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    if (searchName) {
      const filteredUsers = await client.findUsersByPartialName(searchName);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: `00123456${users.length + 1}S`,
      totalActivity: "00:00:00",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}