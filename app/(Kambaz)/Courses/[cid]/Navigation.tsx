"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Courses/1234/Home", label: "Home", id: "wd-course-home-link" },
    { href: "/Courses/1234/Modules", label: "Modules", id: "wd-course-modules-link" },
    { href: "/Courses/1234/Piazza", label: "Piazza", id: "wd-course-piazza-link" },
    { href: "/Courses/1234/Zoom", label: "Zoom", id: "wd-course-zoom-link" },
    { href: "/Courses/1234/Assignments", label: "Assignments", id: "wd-course-assignments-link" },
    { href: "/Courses/1234/Quizzes", label: "Quizzes", id: "wd-course-quizzes-link" },
    { href: "/Courses/1234/Grades", label: "Grades", id: "wd-course-grades-link" },
    { href: "/Courses/1234/People/Table", label: "People", id: "wd-course-people-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.id}
            href={link.href}
            id={link.id}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
