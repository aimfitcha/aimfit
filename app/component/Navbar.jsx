import Link from "next/link";
import React, { } from "react";

function Navbar() {
 

  return (
    <nav className="bg-blue-600 text-white shadow-md">

        {/* Links (Hidden on small screens) */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/add_user" className="hover:text-gray-300">
              Add User
            </Link>
          </li>
        </ul>
    </nav>
  );
}

export default Navbar;
