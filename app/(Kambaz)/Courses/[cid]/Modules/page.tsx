"use client";

import { useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import ModulesControls from "./ModuleControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { v4 as uuidv4 } from "uuid";

// ----------------------
// Define types
// ----------------------
interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  course: string;
  name: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<Module[]>(db.modules);
  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    setModules([
      ...modules,
      {
        _id: uuidv4(),
        name: moduleName,
        course: cid as string,
        lessons: [],
      },
    ]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(
      modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m))
    );
  };

  const updateModule = (module: Module) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };

  // --------------------------
  // Flexible filter:
  // 1. exact match (full code like "CS1234")
  // 2. numeric match (just "1234")
  // --------------------------
  const courseModules = modules.filter((module: Module) => {
    const courseId = String(module.course).toLowerCase();
    const urlId = String(cid).toLowerCase();
    return courseId === urlId || courseId.endsWith(urlId);
  });

  return (
    <div className="container-fluid p-3" id="wd-modules-page">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.length === 0 && (
          <div className="text-muted p-3">
            No modules found for this course.
          </div>
        )}
        {courseModules.map((module: Module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module Header */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      updateModule({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                    autoFocus
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule}
              />
            </div>

            {/* Lessons */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
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