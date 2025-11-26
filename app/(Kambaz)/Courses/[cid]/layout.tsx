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
    // If not logged in, redirect to signin
    if (currentUser === null) {
      router.push("/Account/Signin");
      return;
    }

    // If logged in and enrollments loaded, check enrollment
    if (currentUser && enrollments && enrollments.length > 0) {
      const isEnrolled = enrollments.some(
        (enrollment: Enrollment) =>
          enrollment.user === currentUser._id && enrollment.course === cid
      );

      if (!isEnrolled) {
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