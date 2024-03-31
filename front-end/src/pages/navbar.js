import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
const NAV_ITEMS = [
  {
    name: "Home",
    to: "/mainHome",
    iconPaths: [
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    ],
  },
  {
    name: "Friends",
    to: "/friends",
    iconPaths: [
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    ],
  },
  {
    name: "Profile",
    to: "/profile",
    iconPaths: [
      "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
    ],
  },
  {
    name: "Search",
    to: "/search",
    iconPaths: ["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"],
  },
];

const NavItem = ({ name, to, iconPaths }) => (
  <Link to={to} className="flex flex-col items-center">
    <svg
      className="w-6 h-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {iconPaths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
    <span>{name}</span>
  </Link>
);
const Navbar = () => (
  <nav className="bg-goodreads-darkbrown text-white p-4 fixed bottom-0 inset-x-0 flex justify-between text-xs md:text-sm ">
    {NAV_ITEMS.map((item, index) => (
      <NavItem key={index} {...item} />
    ))}
  </nav>
);

export default Navbar;
