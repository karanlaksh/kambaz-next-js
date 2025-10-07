"use client";
import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    { id: 1234, title: "CS1234 React JS", img: "/images/reactjs.jpg" },
    { id: 1235, title: "CS1235 HTML", img: "/images/html.jpg" },
    { id: 1236, title: "CS1236 CSS", img: "/images/css.jpg" },
    { id: 1237, title: "CS1237 JavaScript", img: "/images/js.jpg" },
    { id: 1238, title: "CS1238 TypeScript", img: "/images/ts.jpg" },
    { id: 1239, title: "CS1239 Node.js", img: "/images/nodejs.jpeg" },
    { id: 1240, title: "CS1240 Next.js", img: "/images/nextjs.jpeg" },
    { id: 1241, title: "CS1241 Express.js", img: "/images/express.jpg" },
    { id: 1242, title: "CS1242 MongoDB", img: "/images/mongodb.jpg" },
    { id: 1243, title: "CS1243 Git & GitHub", img: "/images/github.jpg" },
    { id: 1244, title: "CS1244 REST APIs", img: "/images/restapi.png" },
    { id: 1245, title: "CS1245 Full Stack Project", img: "/images/fullstack.png" },
  ];

  return (
    <div
      id="wd-dashboard"
      className="p-4"
      style={{
        marginLeft: "120px", // spacing from sidebar (~110px wide)
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="mt-4">
        <Row xs={1} md={3} lg={4} className="g-5">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course d-flex justify-content-center"
              style={{ width: "300px" }}
            >
              <Card className="shadow-sm border-0" style={{ width: "300px" }}>
                <Link
                  href={`/Courses/${course.id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.img}
                    alt={`${course.title} image`}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="text-nowrap overflow-hidden">
                      {course.title}
                    </Card.Title>
                    <Card.Text
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      Full Stack software developer
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
