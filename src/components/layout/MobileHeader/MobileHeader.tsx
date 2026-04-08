// WHO CAN EDIT:
// Logo: Junior, Mid, Senior
// Other: Senior

"use client";
import { useState } from "react";
import logo from "../../../assets/logo-white.png";
import styles from "./MobileHeader.module.scss";
import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@/assets/icons/CloseIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import Logo from "../../../assets/logo/Logo_Eucalyptus.png";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

const MobileHeader = ({ data }) => {
  const [showNav, setShowNav] = useState(false);
  const clickHandler = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Inner}>
          <div className={styles.LogoAndMenu}>
            <div onClick={() => setShowNav(false)}>
              <Link href="/" className={styles.Logo}>
                <Image src={Logo} alt="Logo" />
              </Link>
            </div>
            <button className="strip-styles" onClick={() => setShowNav(!showNav)}>
              {showNav && <p>Close</p>}
              {!showNav && <p>Menu</p>}
            </button>
          </div>
          {isFilled.link(data.cta) &&
            <PrismicNextLink field={data.cta} className="button" />
          }
        </div>
      </header>
      <NavigationMobile data={data} isOpen={showNav} setIsOpen={clickHandler} />
    </>
  );
};

export default MobileHeader;
