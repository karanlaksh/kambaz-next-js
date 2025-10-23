"use client";
import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const courses = db.courses;

  return (
    <div
      id="wd-dashboard"
      className="p-4"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        marginLeft: "0px",
      }}
    >
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="mt-4">
        {/* ✅ Let Bootstrap auto-size cards per column */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course._id}>
              <Card className="shadow-sm border-0 h-100">
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.img}
                    alt={`${course.name} image`}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
