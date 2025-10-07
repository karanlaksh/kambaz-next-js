"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account/Signin", label: "Signin" },
    { href: "/Account/Signup", label: "Signup" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <div
      id="wd-account-navigation"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "24px",
        marginTop: "24px",
        gap: "8px",
      }}
    >
      {links.map((link) => {
        const active = pathname.endsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: active ? "black" : "red",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: active ? "bold" : "normal",
              borderLeft: active ? "3px solid black" : "3px solid transparent",
              paddingLeft: "8px",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
