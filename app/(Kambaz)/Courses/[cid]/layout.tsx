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

  // Check if user is enrolled
  useEffect(() => {
    if (currentUser) {
      const isEnrolled = enrollments.some(
        (enrollment: Enrollment) =>
          enrollment.user === currentUser._id && 
          (enrollment.course === cid || enrollment.course === `CS${cid}`)
      );
      
      console.log("Course ID:", cid);
      console.log("User ID:", currentUser._id);
      console.log("Is Enrolled:", isEnrolled);
      console.log("Enrollments:", enrollments.filter((e: Enrollment) => e.user === currentUser._id));
      
      if (!isEnrolled) {
        console.log("Not enrolled, redirecting to Dashboard");
        router.push("/Dashboard");
      }
    }
  }, [currentUser, enrollments, cid, router]);

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