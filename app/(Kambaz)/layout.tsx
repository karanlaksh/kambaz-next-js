import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        {/* Sidebar */}
        <div>
          <KambazNavigation />
        </div>

        {/* Main content */}
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}


