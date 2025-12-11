"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { setCourses } from "../Courses/reducer";
import { setEnrollments, enrollCourse, unenrollCourse } from "../Enrollments/reducer";
import { RootState } from "../store";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

interface Course {
  _id: string;
  name: string;
  img: string;
  description: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();

  // Role check - only Faculty and Admin can do CRUD (case-insensitive)
  const isFaculty = 
    currentUser?.role?.toUpperCase() === "FACULTY" || 
    currentUser?.role?.toUpperCase() === "ADMIN";

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    img: "/images/reactJS.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const fetchCourses = async () => {
    try {
      if (showAllCourses) {
        const allCourses = await coursesClient.fetchAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        const courses = await coursesClient.findMyCourses();
        dispatch(setCourses(courses));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    const enrollments = await enrollmentsClient.fetchAllEnrollments();
    dispatch(setEnrollments(enrollments));
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser, showAllCourses]);

  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const displayedCourses = showAllCourses
    ? courses
    : currentUser
    ? courses
    : [];

  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      await enrollmentsClient.enrollInCourse("current", courseId);
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (currentUser) {
      await enrollmentsClient.unenrollFromCourse("current", courseId);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

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

      {/* Only show New Course section for Faculty/Admin */}
      {isFaculty && (
        <>
          <h5>
            New Course
            {currentUser && (
              <Button
                className="btn btn-primary float-end"
                onClick={() => setShowAllCourses(!showAllCourses)}
                id="wd-enrollments-btn"
              >
                {showAllCourses ? "My Courses" : "Enrollments"}
              </Button>
            )}
            <Button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
            <Button
              className="btn btn-primary float-end me-2"
              onClick={onAddNewCourse}
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
        </>
      )}

      {/* Enrollments button for students (outside the faculty section) */}
      {!isFaculty && currentUser && (
        <>
          <Button
            className="btn btn-primary float-end mb-3"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn"
          >
            {showAllCourses ? "My Courses" : "Enrollments"}
          </Button>
          <div className="clearfix"></div>
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="mt-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id}>
              <Card className="shadow-sm border-0 h-100">
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="text-decoration-none text-dark"
                  onClick={(e) => {
                    if (
                      showAllCourses &&
                      !isEnrolled(course._id) &&
                      currentUser
                    ) {
                      e.preventDefault();
                    }
                  }}
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

                    {showAllCourses && currentUser ? (
                      <div className="mb-2">
                        {isEnrolled(course._id) ? (
                          <Button
                            variant="danger"
                            className="w-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="w-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(course._id);
                            }}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    ) : null}

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>
                      {/* Only show Edit/Delete for Faculty/Admin */}
                      {isFaculty && (
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
                              onDeleteCourse(course._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
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