"use client";
import { useState } from "react";
import { FormControl, Row, Col } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS1234",
    name: "Web Development",
    description: "Learn full-stack web development",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
         href={ASSIGNMENT_API_URL}>
        Get Assignment
      </a>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={MODULE_API_URL}>
        Get Module
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
         href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      <h5>Assignment</h5>
      
      <Row className="mb-3">
        <Col xs={8}>
          <FormControl id="wd-assignment-title"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        </Col>
        <Col xs={4}>
          <a id="wd-update-assignment-title"
             className="btn btn-primary w-100"
             href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
            Update Title
          </a>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={8}>
          <FormControl id="wd-assignment-score" type="number"
            value={assignment.score}
            onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
        </Col>
        <Col xs={4}>
          <a id="wd-update-assignment-score"
             className="btn btn-primary w-100"
             href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
            Update Score
          </a>
        </Col>
      </Row>

      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <a id="wd-update-assignment-completed"
         className="btn btn-primary mb-3"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>

      <h5>Module</h5>
      
      <Row className="mb-3">
        <Col xs={8}>
          <FormControl id="wd-module-name"
            value={module.name}
            onChange={(e) => setModule({ ...module, name: e.target.value })} />
        </Col>
        <Col xs={4}>
          <a id="wd-update-module-name"
             className="btn btn-primary w-100"
             href={`${MODULE_API_URL}/name/${module.name}`}>
            Update Module Name
          </a>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={8}>
          <FormControl id="wd-module-description"
            value={module.description}
            onChange={(e) => setModule({ ...module, description: e.target.value })} />
        </Col>
        <Col xs={4}>
          <a id="wd-update-module-description"
             className="btn btn-primary w-100"
             href={`${MODULE_API_URL}/description/${module.description}`}>
            Update Module Description
          </a>
        </Col>
      </Row>
      
      <hr />
    </div>
  );
}