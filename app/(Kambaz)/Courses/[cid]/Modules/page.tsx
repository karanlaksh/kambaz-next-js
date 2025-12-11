"use client";

import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import ModulesControls from "./ModuleControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { setModules, editModule, updateModule as updateModuleAction } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as coursesClient from "../../client";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  // Role check - only Faculty and Admin can do CRUD (case-insensitive)
  const isFaculty = 
    currentUser?.role?.toUpperCase() === "FACULTY" || 
    currentUser?.role?.toUpperCase() === "ADMIN";

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const onCreateModuleForCourse = async () => {
    if (!courseId) return;
    const newModule = { name: moduleName, description: "" };
    const createdModule = await coursesClient.createModuleForCourse(courseId, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await coursesClient.deleteModule(courseId, moduleId);
    dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
  };

  const onUpdateModule = async (moduleItem: Module) => {
    await coursesClient.updateModule(courseId, moduleItem);
    const newModules = modules.map((m: Module) =>
      m._id === moduleItem._id ? moduleItem : m
    );
    dispatch(setModules(newModules));
  };

  return (
    <div className="container-fluid p-3" id="wd-modules-page">
      {/* Only show ModulesControls for Faculty/Admin */}
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((moduleItem: Module) => (
          <ListGroupItem
            key={moduleItem._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2 fs-3" />
                {!moduleItem.editing && moduleItem.name}
                {moduleItem.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={moduleItem.name}
                    onChange={(e) =>
                      dispatch(
                        updateModuleAction({ ...moduleItem, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...moduleItem, editing: false });
                      }
                    }}
                    autoFocus
                  />
                )}
              </div>
              {/* Only show ModuleControlButtons for Faculty/Admin */}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={moduleItem._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {moduleItem.lessons && moduleItem.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {moduleItem.lessons.map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </div>
                    {/* Only show LessonControlButtons for Faculty/Admin */}
                    {isFaculty && <LessonControlButtons />}
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