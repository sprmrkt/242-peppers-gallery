"use client";
import React from "react";
import { RoomDocument } from "../../../../prismicio-types";
import PrismicCardForDocs from "@/components/general/Card/PrismicCardForDocs";
import styles from "./RoomsGrid.module.scss";
import classNames from "classnames";
import { useFilterStore } from "@/stores/useStore";
import { GroupField } from "@prismicio/client";
import PrismicCard from "@/components/general/Card/PrismicCard";

interface Props {
  // Define the props of the component here.
  rooms: GroupField;
}

const RoomsGrid: React.FC<Props> = ({ rooms }) => {
  const globalCurrentFilterType = useFilterStore((state) => state.globalCurrentFilterType);
  if (!rooms) return null;

  const HolderClasses = classNames(styles.Holder, `show-${globalCurrentFilterType.toLowerCase()}`);
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Grid}>
          {rooms.map((room, index) => {
            return (
              <PrismicCard key={index} item={room} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomsGrid;