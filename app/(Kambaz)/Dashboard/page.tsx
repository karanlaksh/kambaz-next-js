"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";

interface Course {
  _id: string;
  name: string;
  img: string;
  description: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    img: "/images/reactjs.jpg",
    description: "New Description",
  });

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

      {/* New Course Form */}
      <h5>
        New Course
        <Button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </Button>
        <Button
          className="btn btn-primary float-end me-2"
          onClick={() => dispatch(addNewCourse(course))}
          id="wd-add-new-course-click"
        >
          Add
        </Button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        placeholder="Course Description"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />

      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="mt-4">
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
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>
                      <div>
                        <Button
                          variant="warning"
                          className="me-2"
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          id="wd-delete-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
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