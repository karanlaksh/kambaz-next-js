"use client";

import Link from "next/link";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle, FaEllipsisV, FaChevronDown } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database"; // named import

export default function Assignments() {
  const { cid } = useParams();

  // Filter assignments for the current course
  const courseAssignments = assignments.filter(
    (a: any) =>
      String(a.course).toLowerCase() === String(cid).toLowerCase() ||
      String(a.course).endsWith(cid)
  );

  return (
    <div id="wd-assignments" className="p-3">
      {/* --- Search and Buttons Row --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" className="border-start-0" />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2 text-nowrap" id="wd-add-assignment-group">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger" className="text-nowrap" id="wd-add-assignment">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      {/* --- Assignment Group Header --- */}
      <div className="border rounded">
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light fw-bold">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 text-secondary" />
            <FaChevronDown className="me-2 text-secondary small" />
            ASSIGNMENTS
          </div>
          <div className="text-secondary small">
            40% of Total
            <FaPlus className="ms-3 text-secondary" />
            <FaEllipsisV className="ms-3 text-secondary" />
          </div>
        </div>

        {/* --- Assignment List --- */}
        <ul className="list-unstyled mb-0">
          {courseAssignments.length === 0 && (
            <div className="text-muted p-3">No assignments found for this course.</div>
          )}

          {courseAssignments.map((assignment: any, index: number) => (
            <div key={assignment._id}>
              <li className="d-flex align-items-start p-3 ps-2 border-start border-success border-4">
                <BsGripVertical className="me-3 mt-1 text-secondary" />
                <MdAssignment className="me-3 mt-1 text-success fs-4" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-decoration-none fw-semibold text-dark"
                  >
                    {assignment.title}
                  </Link>
                  <div className="text-secondary small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> {assignment.available} |{" "}
                    <b>Due</b> {assignment.due} | {assignment.points} pts
                  </div>
                </div>
                <FaCheckCircle className="text-success fs-5 ms-3 mt-1" />
                <FaEllipsisV className="text-secondary fs-6 ms-3 mt-1" />
              </li>
              {index < courseAssignments.length - 1 && <hr className="my-0" />}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
