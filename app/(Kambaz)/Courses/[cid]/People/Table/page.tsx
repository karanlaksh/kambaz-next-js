"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database"; // adjust relative path if needed

export default function PeopleTable() {
  const { cid } = useParams(); // gets "1235" from URL
  const { users, enrollments } = db;

  // normalize course ID to match enrollments
  const fullCourseId = `CS${cid}`;

  // filter users enrolled in this course
  const courseUsers = users.filter((usr) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === usr._id && enrollment.course === fullCourseId
    )
  );

  return (
    <div id="wd-people-table" className="p-3">
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
          {courseUsers.length > 0 ? (
            courseUsers.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap align-middle">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
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
                No users enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

