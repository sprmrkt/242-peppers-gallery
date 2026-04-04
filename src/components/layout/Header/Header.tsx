// WHO CAN EDIT:
// Logo: Junior, Mid, Senior
// Other: Senior

"use client";
import useScrollDirection from "@/hooks/useScrollDirection";
import styles from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import SubMenu from "./SubMenu/SubMenu";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Logo from "../../../assets/logo/Logo_Eucalyptus.png";
import { isFilled } from "@prismicio/client";
import { useFilterStore } from "@/stores/useStore";

const Header = ({ data }) => {
  const navItems = data?.links;
  const setDesktopMenuOpen = useFilterStore((state) => state.setDesktopMenuOpen);

  return (
    <header className={styles.Header}>
      <div className={styles.Background} />
      <div className={styles.Inner}>
        <Link href="/" className={styles.Logo}>
          <Image src={Logo} alt="Logo" />
        </Link>
        <nav className={styles.Nav}>
          <ul>
            <li><button
              className="strip-styles"
              onClick={() => setDesktopMenuOpen(false)}
              onMouseEnter={() => setDesktopMenuOpen(true)}
            >Menu</button></li>
            {isFilled.link(data.cta) && <li>
              <PrismicNextLink field={data.cta} className="button small" />
            </li>}
          </ul>
          <SubMenu items={navItems} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
