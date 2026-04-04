"use client";
import React, { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import styles from "./SubMenu.module.scss";
import { useFilterStore } from "@/stores/useStore";

const SubMenu = ({ items }) => {
  const desktopMenuOpen = useFilterStore((state) => state.desktopMenuOpen);
  const setDesktopMenuOpen = useFilterStore((state) => state.setDesktopMenuOpen);

  if (!items || items.length === 0) return null;

  console.log(items);

  return (
    <div
      className={styles.SubMenuContainer}
      onMouseLeave={() => setDesktopMenuOpen(false)}
    >
      {desktopMenuOpen && items.length > 0 && (
        <div className={styles.Dropdown}>
          <ul className={styles.DropdownList}>
            {items.map((item, index) => (
              <li key={index} className={styles.DropdownItem}>
                <PrismicNextLink
                  field={item.link}
                  className={styles.DropdownLink}
                  onClick={() => setDesktopMenuOpen(false)}
                >
                  {item.link.text}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubMenu;

