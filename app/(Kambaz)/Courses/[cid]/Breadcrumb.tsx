"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  // Extract the last segment (e.g. "Home", "Modules", "Assignments")
  const section = pathname.split("/").pop();

  return (
    <span className="text-secondary fs-5">
      Course {course?.name} &gt; {section}
    </span>
  );
}
