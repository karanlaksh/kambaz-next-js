"use client";

import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  until?: string;
  points: number;
  modules: string[];
  description?: string;
  group?: string;
  displayGrade?: string;
  submissionType?: string;
  assignedTo?: string;
};

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
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const isNewAssignment = aid === "new";
  const existingAssignment = assignments.find((a) => a._id === aid);

  const defaultDescription = `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`;

  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    title: "New Assignment",
    course: cid as string,
    due: "2025-12-31T23:59",
    available: "2025-11-01T00:00",
    until: "2025-12-31T23:59",
    points: 100,
    modules: [],
    description: defaultDescription,
    group: "ASSIGNMENTS",
    displayGrade: "Percentage",
    submissionType: "Online",
    assignedTo: "Everyone",
  });

  useEffect(() => {
    if (!isNewAssignment && existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [isNewAssignment, existingAssignment]);

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container-fluid p-3" id="wd-assignment-editor">
      <div className="mb-4 text-muted">
        {cid} → Assignments → {assignment.title}
      </div>

      <Form>
        <Form.Group className="mb-3" controlId="wd-assignment-name">
          <Form.Label className="fw-bold">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assignment-description">
          <Form.Control
            as="textarea"
            rows={7}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Points
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: parseInt(e.target.value) })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Assignment Group
          </Form.Label>
          <Col sm="10">
            <Form.Select
              value={assignment.group}
              onChange={(e) => setAssignment({ ...assignment, group: e.target.value })}
            >
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2" className="fw-bold text-start">
            Display Grade as
          </Form.Label>
          <Col sm="10">
            <Form.Select
              value={assignment.displayGrade}
              onChange={(e) =>
                setAssignment({ ...assignment, displayGrade: e.target.value })
              }
            >
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold text-start">
            Submission Type
          </Form.Label>
          <Col sm="10">
            <div className="border rounded p-3">
              <Form.Select
                value={assignment.submissionType}
                onChange={(e) =>
                  setAssignment({ ...assignment, submissionType: e.target.value })
                }
                className="mb-3"
              >
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>

              <Form.Label className="fw-bold ms-1">
                Online Entry Options
              </Form.Label>
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
                  value={assignment.assignedTo}
                  onChange={(e) =>
                    setAssignment({ ...assignment, assignedTo: e.target.value })
                  }
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value={formatDate(assignment.due)}
                      onChange={(e) =>
                        setAssignment({ ...assignment, due: e.target.value })
                      }
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
                      value={formatDate(assignment.available)}
                      onChange={(e) =>
                        setAssignment({ ...assignment, available: e.target.value })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value={formatDate(assignment.until)}
                      onChange={(e) =>
                        setAssignment({ ...assignment, until: e.target.value })
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        <hr className="my-4" />

        <div className="text-end">
          <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="danger"
            style={{ backgroundColor: "#d41b2c", border: "none" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}