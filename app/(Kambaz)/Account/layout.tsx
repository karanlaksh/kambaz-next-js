import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account" className="d-flex">
      <div className="me-4" style={{ minWidth: "150px" }}>
        <AccountNavigation />
      </div>
      <div className="flex-fill">
        {children}
      </div>
    </div>
  );
}