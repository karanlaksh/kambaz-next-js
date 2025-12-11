"use client";

import Link from "next/link";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaCheckCircle,
  FaEllipsisV,
  FaChevronDown,
  FaTrash,
} from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments } from "./reducer";
import { useState, useEffect } from "react";
import * as client from "./client";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  available: string;
  due: string;
  points: number;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  // Role check - only Faculty and Admin can do CRUD (case-insensitive)
  const isFaculty = 
    currentUser?.role?.toUpperCase() === "FACULTY" || 
    currentUser?.role?.toUpperCase() === "ADMIN";

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      await client.deleteAssignment(assignmentToDelete);
      dispatch(
        setAssignments(
          assignments.filter((a) => a._id !== assignmentToDelete)
        )
      );
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
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

        {/* Only show Add buttons for Faculty/Admin */}
        {isFaculty && (
          <div>
            <Button
              variant="secondary"
              className="me-2 text-nowrap"
              id="wd-add-assignment-group"
            >
              <FaPlus className="me-2" /> Group
            </Button>
            <Link href={`/Courses/${cid}/Assignments/new`}>
              <Button
                variant="danger"
                className="text-nowrap"
                id="wd-add-assignment"
              >
                <FaPlus className="me-2" /> Assignment
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="border rounded">
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light fw-bold">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 text-secondary" />
            <FaChevronDown className="me-2 text-secondary small" />
            ASSIGNMENTS
          </div>
          <div className="text-secondary small">
            40% of Total
            {/* Only show Plus icon for Faculty/Admin */}
            {isFaculty && <FaPlus className="ms-3 text-secondary" />}
            <FaEllipsisV className="ms-3 text-secondary" />
          </div>
        </div>

        <ul className="list-unstyled mb-0">
          {assignments.length === 0 && (
            <div className="text-muted p-3">
              No assignments found for this course.
            </div>
          )}

          {assignments.map((assignment: Assignment, index: number) => (
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
                {/* Only show Delete icon for Faculty/Admin */}
                {isFaculty && (
                  <FaTrash
                    className="text-danger fs-5 ms-3 mt-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(assignment._id)}
                  />
                )}
                <FaCheckCircle className="text-success fs-5 ms-3 mt-1" />
                <FaEllipsisV className="text-secondary fs-6 ms-3 mt-1" />
              </li>
              {index < assignments.length - 1 && <hr className="my-0" />}
            </div>
          ))}
        </ul>
      </div>

      <Modal show={showDeleteDialog} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}