"use client";

import { useParams } from "next/navigation";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Link from "next/link";
import { assignments } from "../../../../Database";

// Defined extended Assignment type with optional fields
type Assignment = {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  points: number;
  modules: string[];
  description?: string;
  group?: string;
  displayGrade?: string;
  submissionType?: string;
  assignedTo?: string;
  until?: string;
};

// Helper to format JSON dates for datetime-local input
const formatDate = (date?: string) => {
  if (!date) return "";
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  // Find assignment from database and type it
  const assignment: Assignment | undefined = assignments.find(a => a._id === aid);

  const defaultDescription = `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;

  return (
    <div className="container-fluid p-3" id="wd-assignment-editor">
      {/* Breadcrumb */}
      <div className="mb-4 text-muted">
        {cid} → Assignments → {assignment?.title || "Assignment"}
      </div>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-assignment-name">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={assignment?.title || "A1"}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-assignment-description">
          <Form.Control
            as="textarea"
            rows={7}
            defaultValue={assignment?.description || defaultDescription}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Points
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              defaultValue={assignment?.points || 100}
            />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Assignment Group
          </Form.Label>
          <Col sm="10">
            <Form.Select defaultValue={assignment?.group || "ASSIGNMENTS"}>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Display Grade as
          </Form.Label>
          <Col sm="10">
            <Form.Select defaultValue={assignment?.displayGrade || "Percentage"}>
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold text-start">
            Submission Type
          </Form.Label>
          <Col sm="10">
            <div className="border rounded p-3">
              <Form.Select defaultValue={assignment?.submissionType || "Online"} className="mb-3">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>

              <Form.Label className="fw-bold ms-1">Online Entry Options</Form.Label>
              <div className="ms-4">
                <Form.Check label="Text Entry" />
                <Form.Check label="Website URL" defaultChecked />
                <Form.Check label="Media Recordings" />
                <Form.Check label="Student Annotation" />
                <Form.Check label="File Uploads" />
              </div>
            </div>
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold text-start">
            Assign
          </Form.Label>
          <Col sm="10">
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={assignment?.assignedTo || "Everyone"}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDate(assignment?.due) || "2024-05-13T23:59"}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDate(assignment?.available) || "2025-11-06T12:00"}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDate(assignment?.until) || "2025-12-06T12:00"}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        {/* Divider and Buttons */}
        <hr className="my-4" />

        <div className="text-end">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="outline-secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Button
            variant="danger"
            style={{ backgroundColor: "#d41b2c", border: "none" }}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
