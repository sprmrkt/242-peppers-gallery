import Link from "next/link";
import styles from "./RoomPage.module.scss";
import { RoomDocument } from "../../../prismicio-types";
import React from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface Props {
  // Define the props of the component here.
  page: RoomDocument;
}

const RoomPage: React.FC<Props> = ({ page }) => {
  return (
    <div className={styles.Holder}>
      <div className={styles.Inner}>
        <div className={styles.Text}>
          <h1>{page.data.title}</h1>
          <p>{page.data.beds}</p>
          <p>{page.data.guests}</p>
          <p>{page.data.bath}</p>
          <ul>
            {page.data.features.map((item, index) => {
              if (!isFilled.keyText(item.feature)) return null;
              return <li key={index}>{item.feature}</li>;
            })}
          </ul>
          {isFilled.link(page.data.book_now_link) && <PrismicNextLink field={page.data.book_now_link} />}
        </div>
        <div className={styles.Images}>
          {page.data.images.map((item, index) => {
            if (!isFilled.image(item.image)) return null;
            return (
              <div key={index}>
                <PrismicNextImage field={item.image} />
                <p>{index + 1}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
