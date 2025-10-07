"use client";

import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaChartLine, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { HiOutlineHome, HiOutlineSpeakerphone } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div
      id="wd-course-status"
      className="p-3 border rounded bg-light"
      style={{ width: "350px", minWidth: "300px" }}
    >
      <h2 className="fs-4 mb-3 fw-bold">Course Status</h2>

      {/* Publish/Unpublish Row */}
      <div className="d-flex mb-3">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-unpublish-btn"
          >
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50 ps-1">
          <Button
            variant="success"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-publish-btn"
          >
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-existing"
      >
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-commons"
      >
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-choose-home-page"
      >
        <HiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-course-stream"
      >
        <AiOutlineEye className="me-2 fs-5" /> View Course Stream
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-announcement"
      >
        <HiOutlineSpeakerphone className="me-2 fs-5" /> New Announcement
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-analytics"
      >
        <FaChartLine className="me-2 fs-5" /> New Analytics
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-notifications"
      >
        <FaBell className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
