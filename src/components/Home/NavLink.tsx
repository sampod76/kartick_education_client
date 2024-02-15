import Link from "next/link";
import React from "react";

const NavLink = ({ link, label }: any) => {
  return (
    <div>
      <li>
        <Link
          href={link}
          className={`inline-block mb-2 text-base leading-loose text-body-color hover:text-primary`}
        >
          {label}
        </Link>
      </li>
    </div>
  );
};

export default NavLink;
