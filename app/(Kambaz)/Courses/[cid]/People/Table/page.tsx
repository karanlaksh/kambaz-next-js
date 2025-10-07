"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table" className="p-3">
      <Table striped hover bordered responsive>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {/* --- Row 1 --- */}
          <tr>
            <td className="wd-full-name text-nowrap align-middle">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Karan</span>{" "}
              <span className="wd-last-name">Lakshminarayanan</span>
            </td>
            <td className="wd-login-id align-middle">001234561S</td>
            <td className="wd-section align-middle">S101</td>
            <td className="wd-role align-middle">STUDENT</td>
            <td className="wd-last-activity align-middle">2025-09-15</td>
            <td className="wd-total-activity align-middle">10:21:32</td>
          </tr>

          {/* --- Row 2 --- */}
          <tr>
            <td className="wd-full-name text-nowrap align-middle">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Karishmaa</span>{" "}
              <span className="wd-last-name">Narayanan</span>
            </td>
            <td className="wd-login-id align-middle">001234562S</td>
            <td className="wd-section align-middle">S101</td>
            <td className="wd-role align-middle">TA</td>
            <td className="wd-last-activity align-middle">2025-09-20</td>
            <td className="wd-total-activity align-middle">12:34:56</td>
          </tr>

          {/* --- Row 3 --- */}
          <tr>
            <td className="wd-full-name text-nowrap align-middle">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Thamizhmani</span>{" "}
              <span className="wd-last-name">Baskaran</span>
            </td>
            <td className="wd-login-id align-middle">001234563S</td>
            <td className="wd-section align-middle">S101</td>
            <td className="wd-role align-middle">STUDENT</td>
            <td className="wd-last-activity align-middle">2025-09-30</td>
            <td className="wd-total-activity align-middle">09:45:12</td>
          </tr>

          {/* --- Row 4 --- */}
          <tr>
            <td className="wd-full-name text-nowrap align-middle">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Elana</span>{" "}
              <span className="wd-last-name">Sadok</span>
            </td>
            <td className="wd-login-id align-middle">001234564S</td>
            <td className="wd-section align-middle">S101</td>
            <td className="wd-role align-middle">STUDENT</td>
            <td className="wd-last-activity align-middle">2025-09-30</td>
            <td className="wd-total-activity align-middle">09:45:12</td>
          </tr>


          {/* --- Row 4 --- */}
          <tr>
            <td className="wd-full-name text-nowrap align-middle">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Finn</span>{" "}
              <span className="wd-last-name">Balor</span>
            </td>
            <td className="wd-login-id align-middle">001234565S</td>
            <td className="wd-section align-middle">S101</td>
            <td className="wd-role align-middle">STUDENT</td>
            <td className="wd-last-activity align-middle">2025-09-30</td>
            <td className="wd-total-activity align-middle">09:45:12</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
