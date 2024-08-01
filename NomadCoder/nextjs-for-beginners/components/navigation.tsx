"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
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
  );
};

export default Navigation;
