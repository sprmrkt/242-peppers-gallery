import Link from "next/link";
import styles from "./RoomPage.module.scss";
import { RoomDocument } from "../../../prismicio-types";
import React from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface Props {
  // Define the props of the component here.
  page: RoomDocument;
}

const RoomPage: React.FC<Props> = ({ page }) => {
  if (!page || !page.data) return null;
  return (
    <div className={styles.Holder}>
      <div className={styles.Inner}>
        <div className={styles.Text}>
          <h1 className={styles.Title}>{page.data.title}</h1>
          <div className={styles.Details}>
            <div className={styles.Detail}>
              <p>Bed</p>
              {isFilled.keyText(page.data.beds) && <p>{page.data.beds}</p>}
            </div>
            <div className={styles.Detail}>
              <p>Guests</p>
              {isFilled.keyText(page.data.guests) && <p>{page.data.guests}</p>}
            </div>
            <div className={styles.Detail}>
              <p>Bathroom</p>
              {isFilled.keyText(page.data.bath) && <p>{page.data.bath}</p>}
            </div>
          </div>
          {isFilled.richText(page.data.description) && <PrismicRichText field={page.data.description} />}
          <ul className={styles.List}>
            Features
            {page.data.features.map((item, index) => {
              if (!isFilled.keyText(item.feature)) return null;
              return <li key={index}>{item.feature}</li>;
            })}
          </ul>
          {isFilled.link(page.data.book_now_link) && <PrismicNextLink field={page.data.book_now_link} className="button" />}
        </div>
        <div className={styles.Images}>
          {page.data.images.map((item, index) => {
            if (!isFilled.image(item.image)) return null;
            return (
              <div key={index}>
                <PrismicNextImage field={item.image} />
                <p>{index + 1}.</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
