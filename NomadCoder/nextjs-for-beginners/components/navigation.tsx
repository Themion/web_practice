"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItemProps = {
  href: string;
  name: string;
};

const NavItem = ({ href, name }: NavItemProps) => {
  const path = usePathname();
  const linkName = path === href ? <b>{name}</b> : name;
  return <Link href={href}>{linkName}</Link>;
};

const Navigation = () => {
  // This will not be set when JavaScript is disabled!
  const [count, setCount] = useState(0);
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavItem href="/" name="Home" />
          </li>
          <li>
            <NavItem href="/about-us" name="About Us" />
          </li>
        </ul>
      </nav>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </>
  );
};

export default Navigation;
