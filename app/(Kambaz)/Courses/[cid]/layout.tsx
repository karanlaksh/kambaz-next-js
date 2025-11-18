"use client";
import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";

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

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: Course) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);
  const [checkedEnrollment, setCheckedEnrollment] = useState(false);

  // Check if user is enrolled
  useEffect(() => {
    // Wait for currentUser to be loaded from session
    if (currentUser !== undefined && !checkedEnrollment) {
      if (currentUser) {
        const isEnrolled = enrollments.some(
          (enrollment: Enrollment) =>
            enrollment.user === currentUser._id && 
            (enrollment.course === cid || enrollment.course === `CS${cid}`)
        );
        
        if (!isEnrolled) {
          router.push("/Dashboard");
        }
      }
      setCheckedEnrollment(true);
    }
  }, [currentUser, enrollments, cid, router, checkedEnrollment]);

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={() => setShowNavigation(!showNavigation)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNavigation && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}