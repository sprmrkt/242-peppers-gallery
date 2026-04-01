// WHO CAN EDIT:
// Structure: Senior
"use client";
import styles from "./ContentList.module.scss";
import { ContentListProps } from "@/slices/ContentList";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import PrismicCard from "@/components/general/Card/PrismicCard";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import { Key, useState } from "react";
import { ContentListSliceDefaultPrimaryContentItem } from "../../../../prismicio-types";
import { bgNameToClass } from "@/utils/helpers";

const ContentList = ({
                             title,
                             content,
                             cta,
                             heading_2,
                             background_colour,
                           }: ContentListProps["slice"]["primary"]) => {
  const [ currentType, setCurrentType ] = useState<"All" | "Room" | "Suite">( "All" );
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), `show-${currentType.toLowerCase()}`);
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Headings}>
          {isFilled.richText(heading_2) &&
            <div className={styles.Heading}><PrismicRichText field={heading_2} /></div>}
          {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
          {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}
        </div>
        <div className={styles.Filters}>
          <button className="strip-styles" onClick={() => setCurrentType("All")}>View All</button>
          <button className="strip-styles" onClick={() => setCurrentType("Room")}>Rooms</button>
          <button className="strip-styles" onClick={() => setCurrentType("Suite")}>Suites</button>
        </div>
        <div className={styles.Grid}>
          {content.map((item: ContentListSliceDefaultPrimaryContentItem, index: Key | null | undefined) => {
            if (!item) return null;
            return <PrismicCard key={index} item={item} />;
          })}
        </div>
        {isFilled.link(cta) && (
          <div className={styles.CTA}>
            <PrismicNextLink className="button" field={cta} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
