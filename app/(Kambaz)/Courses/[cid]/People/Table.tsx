"use client";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { User } from "../../../Account/types";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: User[];
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table" className="p-3">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}
      <Table striped hover bordered responsive>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap align-middle">
                  <span
                    className="text-decoration-none text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowDetails(true);
                      setShowUserId(user._id);
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </span>
                </td>
                <td className="wd-login-id align-middle">{user.loginId}</td>
                <td className="wd-section align-middle">{user.section}</td>
                <td className="wd-role align-middle">{user.role}</td>
                <td className="wd-last-activity align-middle">{user.lastActivity}</td>
                <td className="wd-total-activity align-middle">{user.totalActivity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}