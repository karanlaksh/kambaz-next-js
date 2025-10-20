"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import * as db from "../../../Database"; // your working import path
import ModulesControls from "./ModuleControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams(); // get the course ID from URL
  const allModules = db.modules;

  // --------------------------
  // Flexible filter:
  // 1. exact match (full code like "CS1234")
  // 2. numeric match (just "1234")
  // --------------------------
  const courseModules = allModules.filter((module: any) => {
    const courseId = String(module.course).toLowerCase();
    const urlId = String(cid).toLowerCase();
    return courseId === urlId || courseId.endsWith(urlId);
  });

  return (
    <div className="container-fluid p-3" id="wd-modules-page">
      <ModulesControls />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.length === 0 && (
          <div className="text-muted p-3">
            No modules found for this course.
          </div>
        )}
        {courseModules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module Header */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name}
              <ModuleControlButtons />
            </div>

            {/* Lessons */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}


