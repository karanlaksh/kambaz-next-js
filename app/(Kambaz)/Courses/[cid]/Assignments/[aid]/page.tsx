"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h4 className="mb-4">Assignment Editor</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label><b>Assignment Name</b></Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            defaultValue="A1 - ENV + HTML"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Assignment Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue="The assignment is available online to submit."
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control id="wd-points" type="number" defaultValue={100} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select id="wd-display-grade-as">
                <option>Percentage</option>
                <option>Points</option>
                <option>Letter Grade</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Submission Type Box */}
        <Card className="mb-3 border rounded">
          <Card.Body>
            <Form.Group>
              <Form.Label><b>Submission Type</b></Form.Label>
              <Form.Select id="wd-submission-type" className="mb-2">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>

              <div className="ms-3">
                <Form.Check label="Text Entry" id="wd-text-entry" />
                <Form.Check label="Website URL" id="wd-website-url" defaultChecked />
                <Form.Check label="Media Recordings" id="wd-media-recordings" />
                <Form.Check label="Student Annotation" id="wd-student-annotation" />
                <Form.Check label="File Uploads" id="wd-file-upload" />
              </div>
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Assign To Box */}
        <Card className="mb-3 border rounded">
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label><b>Assign To</b></Form.Label>
              <Form.Control id="wd-assign-to" defaultValue="Everyone" />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Due</Form.Label>
                  <Form.Control
                    id="wd-due-date"
                    type="date"
                    defaultValue="2024-05-13"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="date"
                    defaultValue="2024-05-06"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    id="wd-available-until"
                    type="date"
                    defaultValue="2024-05-20"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary">Cancel</Button>
          <Button style={{ backgroundColor: "#d41b2c", border: "none" }}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
