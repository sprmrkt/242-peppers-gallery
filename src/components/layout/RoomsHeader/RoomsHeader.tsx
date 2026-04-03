"use client";
import React from 'react';
import { isFilled, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import styles from './RoomsHeader.module.scss';
import { useFilterStore } from "@/stores/useStore";
import Link from "next/link";

interface Props {
  // Define the props of the component here.
  title: KeyTextField;
  description: RichTextField,
  isPage?: boolean
}

const RoomsHeader: React.FC<Props> = ({ title, description, isPage }) => {
  const setGlobalCurrentFilterType = useFilterStore((state) => state.setGlobalCurrentFilterType);

  return (
    <div className={styles.Holder}>
      <div className={styles.Inner}>
        {!isPage && <h1 className={styles.Title}>{title}</h1>}
        {isPage && <p>{title}</p>}
        <div className={styles.TextHolder}>
          {isFilled.richText(description) && <PrismicRichText field={description} />}
        </div>
        <div className={styles.Filters}>
          <Link href={"/rooms"} onClick={() => setGlobalCurrentFilterType("All")}>View All</Link>
          <Link href={"/rooms"} onClick={() => setGlobalCurrentFilterType("Room")}>Rooms</Link>
          <Link href={"/rooms"} onClick={() => setGlobalCurrentFilterType("Suite")}>Suites</Link>
        </div>
      </div>
    </div>
  );
};

export default RoomsHeader;