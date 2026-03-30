// WHO CAN EDIT:
// Structure: Senior

import styles from "./ContentList.module.scss";
import { ContentListProps } from "@/slices/ContentList";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import PrismicCard from "@/components/general/Card/PrismicCard";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import { Key } from "react";
import { ContentListSliceDefaultPrimaryContentItem } from "../../../../prismicio-types";
import { bgNameToClass } from "@/utils/helpers";

const ContentList = async ({
                             title,
                             content,
                             cta,
                             heading_2,
                             background_colour,
                           }: ContentListProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Headings}>
          {isFilled.richText(heading_2) &&
            <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
          {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
          {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}
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
