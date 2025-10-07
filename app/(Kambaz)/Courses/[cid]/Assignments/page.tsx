"use client";

import Link from "next/link";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaCheckCircle,
  FaEllipsisV,
  FaChevronDown,  // <-- Added
} from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* --- Search and Buttons Row --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            className="border-start-0"
          />
        </InputGroup>

        <div>
          <Button
            variant="secondary"
            className="me-2 text-nowrap"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-2" />
            Group
          </Button>

          <Button
            variant="danger"
            className="text-nowrap"
            id="wd-add-assignment"
          >
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      {/* --- Assignment Group Header --- */}
      <div className="border rounded">
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light fw-bold">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 text-secondary" />
            <FaChevronDown className="me-2 text-secondary small" />  {/* <-- arrow added here */}
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
          {/* --- A1 --- */}
          <li className="d-flex align-items-start p-3 ps-2 border-start border-success border-4">
            <BsGripVertical className="me-3 mt-1 text-secondary" />
            <MdAssignment className="me-3 mt-1 text-success fs-4" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/123"
                className="text-decoration-none fw-semibold text-dark"
              >
                A1 – ENV + HTML
              </Link>
              <div className="text-secondary small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <b>Not available until</b> October 23rd at 12:00 am |{" "}
                <b>Due</b> October 27th at 11:59 pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success fs-5 ms-3 mt-1" />
            <FaEllipsisV className="text-secondary fs-6 ms-3 mt-1" />
          </li>

          <hr className="my-0" />

          {/* --- A2 --- */}
          <li className="d-flex align-items-start p-3 ps-2 border-start border-success border-4">
            <BsGripVertical className="me-3 mt-1 text-secondary" />
            <MdAssignment className="me-3 mt-1 text-success fs-4" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/124"
                className="text-decoration-none fw-semibold text-dark"
              >
                A2 – CSS + BOOTSTRAP
              </Link>
              <div className="text-secondary small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <b>Not available until</b> October 31st at 12:00 am |{" "}
                <b>Due</b> November 6th at 11:59 pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success fs-5 ms-3 mt-1" />
            <FaEllipsisV className="text-secondary fs-6 ms-3 mt-1" />
          </li>

          <hr className="my-0" />

          {/* --- A3 --- */}
          <li className="d-flex align-items-start p-3 ps-2 border-start border-success border-4">
            <BsGripVertical className="me-3 mt-1 text-secondary" />
            <MdAssignment className="me-3 mt-1 text-success fs-4" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/125"
                className="text-decoration-none fw-semibold text-dark"
              >
                A3 – JAVASCRIPT + REACT
              </Link>
              <div className="text-secondary small">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <b>Not available until</b> November 9th at 12:00 am |{" "}
                <b>Due</b> November 15th at 11:59 pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success fs-5 ms-3 mt-1" />
            <FaEllipsisV className="text-secondary fs-6 ms-3 mt-1" />
          </li>
        </ul>
      </div>
    </div>
  );
}

