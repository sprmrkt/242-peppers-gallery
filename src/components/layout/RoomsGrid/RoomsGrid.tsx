"use client";
import React from "react";
import { RoomDocument } from "../../../../prismicio-types";
import PrismicCardForDocs from "@/components/general/Card/PrismicCardForDocs";
import styles from "./RoomsGrid.module.scss";
import classNames from "classnames";
import { useFilterStore } from "@/stores/useStore";

interface Props {
  // Define the props of the component here.
  rooms: RoomDocument[];
}

const RoomsGrid: React.FC<Props> = ({ rooms }) => {
  const globalCurrentFilterType = useFilterStore((state) => state.globalCurrentFilterType);
  if (!rooms) return null;

  const HolderClasses = classNames(styles.Holder, `show-${globalCurrentFilterType.toLowerCase()}`);
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Grid}>
          {rooms.map((page, index) => {
            return (
              <PrismicCardForDocs key={index} item={page} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomsGrid;