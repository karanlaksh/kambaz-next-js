"use client";
import { FaCheckCircle } from "react-icons/fa";

export default function GreenCheckmark() {
  return (
    <FaCheckCircle
      className="text-success me-2"
      style={{
        color: "green",
        borderRadius: "50%",
        verticalAlign: "middle",
      }}
    />
  );
}
