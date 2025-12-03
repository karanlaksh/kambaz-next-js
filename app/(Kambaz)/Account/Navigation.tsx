"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  const getLinks = () => {
    if (!currentUser) return ["Signin", "Signup"];
    if (currentUser.role === "ADMIN") return ["Profile", "Users"];
    return ["Profile"];
  };

  const links = getLinks();

  return (
    <Nav className="flex-column">
      {links.map((link) => {
        const href = `/Account/${link}`;
        const isActive = pathname === href || pathname.toLowerCase().includes(link.toLowerCase());

        return (
          <NavItem key={link}>
            <NavLink
              as={Link}
              href={href}
              className={`${isActive ? "text-dark bg-white" : "text-danger"}`}
              style={{
                borderLeft: isActive ? "3px solid black" : "none",
                paddingLeft: isActive ? "12px" : "15px",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {link}
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}